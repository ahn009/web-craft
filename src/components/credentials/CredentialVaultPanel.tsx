import { useEffect, useState } from 'react';
import { KeyRound, Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  createCredential,
  deleteCredential,
  fetchCredentials,
  type UserCredentialSafe,
} from '@/services/api';
import { getErrorMessage } from '@/lib/errors';

interface CredentialVaultPanelProps {
  token: string;
}

export function CredentialVaultPanel({ token }: CredentialVaultPanelProps) {
  const [credentials, setCredentials] = useState<UserCredentialSafe[]>([]);
  const [provider, setProvider] = useState('');
  const [label, setLabel] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchCredentials(token)
      .then(setCredentials)
      .catch((err: unknown) => setError(getErrorMessage(err, 'Failed to load credentials')))
      .finally(() => setLoading(false));
  }, [token]);

  const handleCreate = async () => {
    if (!provider || !label || !secret) return;
    setSaving(true);
    setError('');
    try {
      const credential = await createCredential(token, { provider, label, secret });
      setCredentials((items) => [credential, ...items]);
      setProvider('');
      setLabel('');
      setSecret('');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to save credential'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (credentialId: string) => {
    setDeletingId(credentialId);
    setError('');
    try {
      await deleteCredential(token, credentialId);
      setCredentials((items) => items.filter((item) => item.id !== credentialId));
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to delete credential'));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-border/50 bg-secondary/20 p-5">
      <div className="flex items-center gap-2 mb-5">
        <KeyRound className="w-5 h-5 text-cyan" />
        <h2 className="text-lg font-semibold">Credential Vault</h2>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.4fr_auto] gap-3 mb-5">
        <Input value={provider} onChange={(event) => setProvider(event.target.value)} placeholder="Provider" />
        <Input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Label" />
        <Input
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          placeholder="Secret"
          type="password"
        />
        <Button
          onClick={handleCreate}
          disabled={saving || !provider || !label || !secret}
          className="bg-cyan text-navy-900 hover:bg-cyan/90"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading credentials
        </div>
      ) : credentials.length === 0 ? (
        <p className="text-sm text-muted-foreground">No credentials saved yet.</p>
      ) : (
        <div className="space-y-2">
          {credentials.map((credential) => (
            <div
              key={credential.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-background/40 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{credential.label}</div>
                <div className="text-xs text-muted-foreground">
                  {credential.provider}
                  {credential.lastFour ? ` ending in ${credential.lastFour}` : ''}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(credential.id)}
                disabled={deletingId === credential.id}
                aria-label={`Delete ${credential.label}`}
              >
                {deletingId === credential.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
