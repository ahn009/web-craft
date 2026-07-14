import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Tag,
  Layers,
  DollarSign,
  Play,
  CheckCircle,
  Clock,
  Loader2,
  ShoppingCart,
  Download,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/errors';
import {
  checkoutAgent,
  downloadAgentWorkflow,
  fetchAgentById,
  fetchMyAgents,
  testAgent,
} from '@/services/api';
import type { MarketplaceAgentDetail, TestResult } from '@/services/api';

export default function MarketplaceAgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { isAuthenticated, token } = useAuth();
  const [agent, setAgent] = useState<MarketplaceAgentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testing, setTesting] = useState(false);
  const [checkingOwnership, setCheckingOwnership] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [purchaseError, setPurchaseError] = useState('');
  const [purchasing, setPurchasing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchAgentById(id)
      .then(setAgent)
      .catch(() => setError('Failed to load agent details.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id || !token) {
      setIsOwned(false);
      setPurchaseMessage('');
      setPurchaseError('');
      return;
    }

    setCheckingOwnership(true);
    fetchMyAgents(token)
      .then((purchases) => {
        const owned = purchases.some((purchase) => purchase.agent.id === id);
        setIsOwned(owned);
      })
      .catch(() => {
        setIsOwned(false);
      })
      .finally(() => setCheckingOwnership(false));
  }, [id, token]);

  const handleTest = async () => {
    if (!id) return;
    setTesting(true);
    setTestResult(null);
    try {
      const result = await testAgent(id);
      setTestResult(result);
    } catch {
      setError('Failed to run test simulation.');
    } finally {
      setTesting(false);
    }
  };

  const handlePurchase = async () => {
    if (!id || !token) return;
    setPurchasing(true);
    setPurchaseError('');
    setPurchaseMessage('');
    try {
      const result = await checkoutAgent(id, token);
      setIsOwned(true);
      setPurchaseMessage(result.message);
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'Failed to claim demo access');
      if (message.toLowerCase().includes('already purchased')) {
        setIsOwned(true);
        setPurchaseMessage('You already own this agent.');
      } else {
        setPurchaseError(message);
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleDownload = async () => {
    if (!id || !token || !agent) return;
    setDownloading(true);
    setPurchaseError('');
    try {
      const blob = await downloadAgentWorkflow(id, token);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${agent.name.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-|-$/g, '') || 'workflow'}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setPurchaseError(getErrorMessage(err, 'Failed to download workflow'));
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin" />
      </div>
    );
  }

  if (error && !agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link to="/marketplace">
            <Button variant="outline" className="border-cyan/30">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!agent) return null;

  const workflowNodes = (agent.rawJson?.nodes as Array<{ name?: string; type?: string }>) ?? [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        {/* Agent header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan/10 text-sm text-cyan font-medium">
                  <Layers className="w-3.5 h-3.5" />
                  {agent.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {agent.nodeCount} nodes
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{agent.name}</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-2xl font-bold text-foreground">
                <DollarSign className="w-6 h-6" />
                {agent.price === 0 ? 'Free' : agent.price.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl">
            {agent.description || 'An AI agent built from an n8n workflow.'}
          </p>
        </motion.div>

        {/* Tags */}
        {agent.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {agent.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple/10 text-sm text-purple"
              >
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <Button
            onClick={handleTest}
            disabled={testing}
            className="bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold px-8 py-3 rounded-full"
          >
            {testing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Running Test...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Test Agent
              </>
            )}
          </Button>
          {isAuthenticated ? (
            isOwned ? (
              <Button
                onClick={handleDownload}
                disabled={downloading || checkingOwnership}
                variant="outline"
                className="border-cyan/30 text-cyan hover:bg-cyan/10 font-semibold px-8 py-3 rounded-full"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Download Workflow
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handlePurchase}
                disabled={purchasing || checkingOwnership}
                variant="outline"
                className="border-purple/40 text-purple hover:bg-purple/10 font-semibold px-8 py-3 rounded-full"
              >
                {purchasing || checkingOwnership ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {checkingOwnership ? 'Checking...' : 'Purchasing...'}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {agent.price === 0 ? 'Claim Demo Access' : 'Simulate Purchase'}
                  </>
                )}
              </Button>
            )
          ) : (
            <Button
              asChild
              variant="outline"
              className="border-purple/40 text-purple hover:bg-purple/10 font-semibold px-8 py-3 rounded-full"
            >
              <Link to={`/login?redirect=${encodeURIComponent(location.pathname)}`}>
                <Lock className="w-5 h-5 mr-2" />
                Sign In to Claim
              </Link>
            </Button>
          )}
        </motion.div>

        {(purchaseMessage || purchaseError) && (
          <div
            className={`mb-8 p-4 rounded-xl border text-sm ${
              purchaseError
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}
          >
            {purchaseError || purchaseMessage}
          </div>
        )}

        {/* Test Results */}
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 rounded-xl bg-secondary/30 border border-cyan/20"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Test Result: {testResult.status}
            </h2>
            <div className="flex flex-wrap gap-6 mb-6 text-sm">
              <div>
                <span className="text-muted-foreground">Workflow:</span>{' '}
                <span className="text-foreground font-medium">{testResult.workflowName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Nodes:</span>{' '}
                <span className="text-foreground font-medium">{testResult.totalNodes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Total:</span>{' '}
                <span className="text-foreground font-medium">{testResult.executionTime}</span>
              </div>
            </div>

            <div className="space-y-2">
              {testResult.steps.map((step) => (
                <div
                  key={step.step}
                  className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 text-sm"
                >
                  <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-medium text-xs">
                    {step.step}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-foreground font-medium">{step.name}</span>
                    <span className="text-muted-foreground ml-2">({step.type})</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{step.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Workflow Nodes Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">Workflow Nodes ({workflowNodes.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {workflowNodes.map((node, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-secondary/30 border border-border/50"
              >
                <div className="text-sm font-medium text-foreground">{node.name || `Node ${i + 1}`}</div>
                <div className="text-xs text-muted-foreground mt-1">{node.type || 'Unknown type'}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Raw JSON preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">Workflow JSON Preview</h2>
          <div className="p-4 rounded-xl bg-navy-900/50 border border-border/50 overflow-auto max-h-96">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
              {JSON.stringify(agent.rawJson, null, 2).slice(0, 5000)}
              {JSON.stringify(agent.rawJson, null, 2).length > 5000 && '\n... (truncated)'}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
