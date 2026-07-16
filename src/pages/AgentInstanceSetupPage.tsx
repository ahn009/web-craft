import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, KeyRound, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CredentialVaultPanel } from '@/components/credentials/CredentialVaultPanel';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchAgentInstance,
  fetchCredentialRequirements,
  fetchCredentials,
  updateAgentInstanceCredentials,
  type AgentInstance,
  type CredentialRequirement,
  type UserCredentialSafe,
} from '@/services/api';
import { getErrorMessage } from '@/lib/errors';

export default function AgentInstanceSetupPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, token } = useAuth();
  const [instance, setInstance] = useState<AgentInstance | null>(null);
  const [requirements, setRequirements] = useState<CredentialRequirement[]>([]);
  const [credentials, setCredentials] = useState<UserCredentialSafe[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || !token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    Promise.all([fetchAgentInstance(id, token), fetchCredentials(token)])
      .then(async ([instanceData, credentialData]) => {
        setInstance(instanceData);
        setCredentials(credentialData);
        setSelected(
          Object.fromEntries(
            instanceData.credentialLinks.map((link) => [link.credentialRequirementId, link.userCredentialId])
          )
        );

        if (instanceData.agentId) {
          setRequirements(await fetchCredentialRequirements(instanceData.agentId));
        }
      })
      .catch((err: unknown) => setError(getErrorMessage(err, 'Failed to load setup')))
      .finally(() => setLoading(false));
  }, [id, token]);

  const linkedCount = useMemo(
    () => requirements.filter((requirement) => selected[requirement.id]).length,
    [requirements, selected]
  );

  const handleSave = async () => {
    if (!id || !token) return;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const links = Object.entries(selected)
        .filter(([, userCredentialId]) => userCredentialId)
        .map(([credentialRequirementId, userCredentialId]) => ({ credentialRequirementId, userCredentialId }));
      const updated = await updateAgentInstanceCredentials(id, token, links);
      setInstance(updated);
      setMessage(updated.setup.ready ? 'Agent setup is ready.' : 'Credential links saved.');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to save setup'));
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="relative max-w-xl mx-auto px-4 text-center">
          <KeyRound className="w-12 h-12 text-cyan mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Sign in to set up this agent</h1>
          <Button asChild className="bg-cyan text-navy-900 hover:bg-cyan/90 rounded-full px-8">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/my-agents" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to My Agents
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1 text-sm font-medium text-cyan mb-4">
            <KeyRound className="w-4 h-4" />
            Agent Setup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{instance?.displayName || instance?.agent?.name || 'Agent'}</h1>
          <p className="text-muted-foreground max-w-2xl">
            Link saved credentials to this agent. Secret values stay encrypted and are never shown after saving.
          </p>
        </div>

        {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>}
        {message && <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">{message}</div>}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-border/50 bg-secondary/20 p-5">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-lg font-semibold">Required Credentials</h2>
                <p className="text-sm text-muted-foreground">
                  {linkedCount} of {requirements.length} linked
                </p>
              </div>
              {instance?.setup.ready && <CheckCircle className="w-6 h-6 text-emerald-400" />}
            </div>

            {requirements.length === 0 ? (
              <p className="text-sm text-muted-foreground">No credential requirements detected for this workflow.</p>
            ) : (
              <div className="space-y-4">
                {requirements.map((requirement) => (
                  <label key={requirement.id} className="block">
                    <span className="block text-sm font-medium mb-2">
                      {requirement.displayName}
                      <span className="ml-2 text-xs text-muted-foreground">{requirement.nodeName}</span>
                    </span>
                    <select
                      value={selected[requirement.id] ?? ''}
                      onChange={(event) => setSelected((current) => ({ ...current, [requirement.id]: event.target.value }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Choose a saved credential</option>
                      {credentials
                        .filter((credential) => credential.provider.toLowerCase() === requirement.credentialType.toLowerCase())
                        .map((credential) => (
                          <option key={credential.id} value={credential.id}>
                            {credential.label}
                            {credential.lastFour ? ` ending in ${credential.lastFour}` : ''}
                          </option>
                        ))}
                      {credentials
                        .filter((credential) => credential.provider.toLowerCase() !== requirement.credentialType.toLowerCase())
                        .map((credential) => (
                          <option key={credential.id} value={credential.id}>
                            {credential.label} ({credential.provider})
                          </option>
                        ))}
                    </select>
                  </label>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Button onClick={handleSave} disabled={saving} className="bg-cyan text-navy-900 hover:bg-cyan/90">
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Setup
              </Button>
            </div>
          </div>

          {token && <CredentialVaultPanel token={token} />}
        </div>
      </div>
    </div>
  );
}
