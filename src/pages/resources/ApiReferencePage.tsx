import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  Key,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const endpoints = [
  {
    method: 'GET',
    path: '/v1/agents',
    description:
      'Retrieve a paginated list of all AI agents in your workspace. Supports filtering by type, status, and deployment target. Returns agent metadata, current status, and configuration summaries.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    method: 'POST',
    path: '/v1/agents',
    description:
      'Create a new AI agent with the specified configuration. Accepts agent type, name, behavior rules, training data references, and deployment preferences in the request body.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    method: 'GET',
    path: '/v1/agents/:id',
    description:
      'Fetch detailed information about a specific agent by ID. Returns full configuration, deployment history, performance metrics, and current operational status.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    method: 'PUT',
    path: '/v1/agents/:id',
    description:
      'Update an existing agent configuration. Supports partial updates for behavior rules, response templates, integration settings, and escalation thresholds without redeployment.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    method: 'POST',
    path: '/v1/agents/:id/deploy',
    description:
      'Trigger a deployment for the specified agent. Accepts target environment (cloud, on-premise, hybrid), scaling parameters, and rollback configuration options.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    method: 'GET',
    path: '/v1/analytics',
    description:
      'Retrieve analytics data across all agents or filtered by agent ID. Returns conversation volumes, resolution rates, response times, sentiment scores, and custom metric values.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
];

const rateLimits = [
  { tier: 'Starter', limit: '100 requests/min', burst: '150', daily: '50,000' },
  { tier: 'Pro', limit: '1,000 requests/min', burst: '1,500', daily: '500,000' },
  { tier: 'Enterprise', limit: 'Unlimited', burst: 'Unlimited', daily: 'Unlimited' },
];

const codeExamples: Record<string, string> = {
  cURL: `curl -X GET "https://api.webcraft.ai/v1/agents" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  JavaScript: `const response = await fetch(
  "https://api.webcraft.ai/v1/agents",
  {
    method: "GET",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
  }
);

const agents = await response.json();
console.log(agents.data);`,
  Python: `import requests

response = requests.get(
    "https://api.webcraft.ai/v1/agents",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
    }
)

agents = response.json()
print(agents["data"])`,
};

export default function ApiReferencePage() {
  const [activeTab, setActiveTab] = useState('cURL');
  const [copied, setCopied] = useState(false);

  const [authRef, authInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [endpointsRef, endpointsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [rateRef, rateInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [codeRef, codeInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero
        badge="API Reference"
        title="Build with Our"
        highlight="Powerful API"
        description="A complete RESTful API for managing AI agents programmatically. Create, configure, deploy, and monitor agents with simple HTTP requests and comprehensive SDKs."
      />

      {/* Authentication */}
      <section ref={authRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={authInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <Key className="w-4 h-4 text-cyan" />
              <span className="text-sm text-cyan font-medium">Authentication</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Secure <span className="gradient-text">API Access</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All API requests require authentication via Bearer tokens. Generate your API key
              from the dashboard and include it in every request header.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={authInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border border-border/50 bg-secondary/50 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3 border-b border-border/50 bg-card/50">
                <span className="text-sm text-muted-foreground font-medium">Request Header</span>
                <span className="text-xs text-cyan bg-cyan/10 px-2 py-1 rounded-full">Required</span>
              </div>
              <div className="p-6">
                <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
                  <span className="text-purple">Authorization</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-cyan">Bearer YOUR_API_KEY</span>
                  {'\n'}
                  <span className="text-purple">Content-Type</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-cyan">application/json</span>
                  {'\n'}
                  <span className="text-purple">X-API-Version</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-cyan">2024-01</span>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Endpoints */}
      <section ref={endpointsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={endpointsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">Endpoints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Available <span className="gradient-text">Endpoints</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Core API endpoints for managing your AI agents. All endpoints follow RESTful conventions
              and return JSON responses with consistent error handling.
            </p>
          </motion.div>

          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={`${endpoint.method}-${endpoint.path}`}
                initial={{ opacity: 0, x: -30 }}
                animate={endpointsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="p-5 rounded-xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-bold font-mono ${endpoint.bg} ${endpoint.color}`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {endpoint.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section ref={rateRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={rateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <span className="text-sm text-cyan font-medium">Rate Limits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Usage <span className="gradient-text">Limits</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Rate limits are applied per API key to ensure fair usage and platform stability.
              Upgrade your plan for higher throughput and burst capacity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={rateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Tier</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Rate Limit</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Burst Limit</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Daily Limit</th>
                </tr>
              </thead>
              <tbody>
                {rateLimits.map((item, i) => (
                  <tr
                    key={item.tier}
                    className={`border-b border-border/30 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td className="py-4 px-6">
                      <span
                        className={`text-sm font-semibold ${
                          item.tier === 'Enterprise'
                            ? 'text-cyan'
                            : item.tier === 'Pro'
                            ? 'text-purple'
                            : 'text-foreground'
                        }`}
                      >
                        {item.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground font-mono">{item.limit}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground font-mono">{item.burst}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground font-mono">{item.daily}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Code Examples */}
      <section ref={codeRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={codeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">Code Examples</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start <span className="gradient-text">Building</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Copy and paste these examples to make your first API call. Available in cURL, JavaScript,
              and Python with full request and response documentation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={codeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border border-border/50 bg-secondary/50 backdrop-blur-sm overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center gap-1 px-4 py-3 border-b border-border/50 bg-card/50">
                {Object.keys(codeExamples).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-cyan/20 text-cyan border border-cyan/40'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  onClick={handleCopy}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              {/* Code */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-cyan whitespace-pre">
                  {codeExamples[activeTab]}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="p-10 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5" />
              <div className="relative z-10">
                <BookOpen className="w-10 h-10 text-cyan mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Explore the Full <span className="gradient-text">Documentation</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Dive deeper into authentication flows, webhook setup, error handling patterns,
                  and advanced configuration options in our comprehensive documentation.
                </p>
                <Link to="/documentation">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                  >
                    View Documentation
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
