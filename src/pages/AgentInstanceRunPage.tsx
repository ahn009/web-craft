import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  createAgentRun,
  fetchAgentInstance,
  fetchAgentRuns,
  type AgentExecution,
  type AgentInstance,
} from '@/services/api';
import { getErrorMessage } from '@/lib/errors';

export default function AgentInstanceRunPage() {
  const { id } = useParams<{ id: string }>();
  const { token, isAuthenticated } = useAuth();
  const [instance, setInstance] = useState<AgentInstance | null>(null);
  const [runs, setRuns] = useState<AgentExecution[]>([]);
  const [input, setInput] = useState('{\n  "message": "Hello"\n}');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    if (!id || !token) return;
    const [instanceData, runData] = await Promise.all([fetchAgentInstance(id, token), fetchAgentRuns(id, token)]);
    setInstance(instanceData);
    setRuns(runData);
  };

  useEffect(() => {
    if (!id || !token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    load()
      .catch((err: unknown) => setError(getErrorMessage(err, 'Failed to load runs')))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleRun = async () => {
    if (!id || !token) return;
    setRunning(true);
    setError('');
    try {
      const parsedInput = JSON.parse(input) as Record<string, unknown>;
      const run = await createAgentRun(id, token, parsedInput);
      setRuns((items) => [run, ...items]);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to queue run'));
    } finally {
      setRunning(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Sign in to run this agent</h1>
        <Button asChild className="bg-cyan text-navy-900 hover:bg-cyan/90 rounded-full px-8">
          <Link to="/login">Sign In</Link>
        </Button>
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
        <Link
          to={id ? `/agent-instances/${id}/setup` : '/my-agents'}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Setup
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1 text-sm font-medium text-cyan mb-4">
            <Play className="w-4 h-4" />
            Manual Run
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{instance?.displayName || instance?.agent?.name || 'Agent'}</h1>
          <p className="text-muted-foreground max-w-2xl">
            Queue a hosted execution. A worker processes queued runs and records output, errors, and logs.
          </p>
        </div>

        {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-border/50 bg-secondary/20 p-5">
            <label className="block text-sm font-medium mb-2">Run Input</label>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-64 w-full rounded-lg border border-input bg-background p-3 font-mono text-sm"
            />
            <Button onClick={handleRun} disabled={running || instance?.status !== 'READY'} className="mt-4 bg-cyan text-navy-900 hover:bg-cyan/90">
              {running ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
              Queue Run
            </Button>
          </div>

          <div className="rounded-xl border border-border/50 bg-secondary/20 p-5">
            <h2 className="text-lg font-semibold mb-4">Execution History</h2>
            {runs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No runs yet.</p>
            ) : (
              <div className="space-y-3">
                {runs.map((run) => (
                  <div key={run.id} className="rounded-lg border border-border/40 bg-background/40 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">{run.status}</span>
                      <span className="text-xs text-muted-foreground">{new Date(run.createdAt).toLocaleString()}</span>
                    </div>
                    {run.error && <p className="mt-2 text-xs text-red-400">{run.error}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
