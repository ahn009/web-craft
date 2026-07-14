import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Layers, Loader2, PackageOpen, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { downloadAgentWorkflow, fetchMyAgents } from '@/services/api';
import type { PurchasedAgent } from '@/services/api';
import { getErrorMessage } from '@/lib/errors';

function workflowFileName(name: string) {
  return `${name.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-|-$/g, '') || 'workflow'}.json`;
}

export default function MyAgentsPage() {
  const { isAuthenticated, token } = useAuth();
  const [items, setItems] = useState<PurchasedAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setItems([]);
      return;
    }

    setLoading(true);
    setError('');
    fetchMyAgents(token)
      .then(setItems)
      .catch((err: unknown) => setError(getErrorMessage(err, 'Failed to load your agents')))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDownload = async (item: PurchasedAgent) => {
    if (!token) return;
    setDownloadingId(item.agent.id);
    setError('');
    try {
      const blob = await downloadAgentWorkflow(item.agent.id, token);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = workflowFileName(item.agent.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to download workflow'));
    } finally {
      setDownloadingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-cyan" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Sign in to view your agents</h1>
          <p className="text-muted-foreground mb-8">
            Your claimed demo workflows are available from your account after login.
          </p>
          <Button asChild className="bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold rounded-full px-8">
            <Link to="/login?redirect=/my-agents">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 text-cyan text-sm font-medium mb-4">
            <ShoppingBag className="w-4 h-4" />
            Claimed Workflows
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Agents</h1>
          <p className="text-muted-foreground max-w-2xl">
            Download the workflow JSON for agents you have claimed from the marketplace demo flow.
          </p>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-44 rounded-xl bg-secondary/30 border border-border/50 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-border/50 bg-secondary/20">
            <PackageOpen className="w-14 h-14 text-muted-foreground mx-auto mb-5" />
            <h2 className="text-2xl font-semibold mb-3">No agents yet</h2>
            <p className="text-muted-foreground mb-8">Browse the marketplace and claim your first workflow.</p>
            <Button asChild className="bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold rounded-full px-8">
              <Link to="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((item, index) => (
              <motion.div
                key={item.purchaseId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="p-5 rounded-xl bg-secondary/30 border border-border/50 hover:border-cyan/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan/10 text-xs text-cyan font-medium mb-3">
                      <Layers className="w-3 h-3" />
                      {item.agent.category}
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">{item.agent.name}</h2>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.amount === 0 ? 'Free' : `$${item.amount.toFixed(2)}`}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {item.agent.description || 'An AI agent built from n8n workflow.'}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground">
                    {item.agent.nodeCount} nodes · Claimed {new Date(item.purchasedAt).toLocaleDateString()}
                  </div>
                  <Button
                    onClick={() => handleDownload(item)}
                    disabled={downloadingId === item.agent.id}
                    size="sm"
                    variant="outline"
                    className="border-cyan/30 text-cyan hover:bg-cyan/10 rounded-full"
                  >
                    {downloadingId === item.agent.id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
