import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Cloud, Server, Check, Minus, Zap } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import { agents } from '@/lib/agents';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'communication', label: 'Communication' },
  { id: 'business', label: 'Business' },
  { id: 'data', label: 'Data' },
  { id: 'custom', label: 'Custom' },
];

const categoryMap: Record<string, string[]> = {
  all: ['whatsapp', 'support', 'sales', 'analytics', 'social', 'custom'],
  communication: ['whatsapp', 'support'],
  business: ['sales', 'social'],
  data: ['analytics'],
  custom: ['custom'],
};

const comparisonFeatures = [
  { label: 'Cloud Deployment', key: 'cloud' },
  { label: 'On-Premise Deployment', key: 'local' },
  { label: 'Multi-Language', key: 'multilang' },
  { label: 'API Access', key: 'api' },
  { label: 'Real-Time Analytics', key: 'realtime' },
  { label: 'Custom Workflows', key: 'workflows' },
  { label: 'CRM Integration', key: 'crm' },
  { label: 'White-Label', key: 'whitelabel' },
];

const agentCapabilities: Record<string, string[]> = {
  whatsapp: ['cloud', 'local', 'multilang', 'api', 'realtime', 'workflows'],
  support: ['cloud', 'local', 'multilang', 'api', 'realtime', 'workflows', 'crm'],
  sales: ['cloud', 'api', 'realtime', 'workflows', 'crm'],
  analytics: ['cloud', 'local', 'api', 'realtime', 'workflows'],
  social: ['cloud', 'api', 'realtime', 'workflows'],
  custom: ['cloud', 'local', 'multilang', 'api', 'realtime', 'workflows', 'crm', 'whitelabel'],
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [tableRef, tableInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredAgents = agents.filter((agent) =>
    categoryMap[activeCategory]?.includes(agent.id)
  );

  return (
    <>
      <PageHero
        badge="Our Services"
        title="AI Agents for"
        highlight="Every Need"
        description="From customer communication to data analytics, find the perfect AI agent to accelerate your business. Each agent is purpose-built, fully configurable, and ready to deploy in minutes."
      />

      {/* Category Tabs */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-cyan/20 text-cyan border border-cyan/40 shadow-glow'
                    : 'bg-card/50 text-muted-foreground border border-border/50 hover:border-cyan/30 hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section ref={gridRef} className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Color accent bar */}
                    <div
                      className="w-12 h-1 rounded-full mb-5"
                      style={{ backgroundColor: agent.color }}
                    />

                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-cyan transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2.5 mb-6">
                      {agent.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2.5 text-sm text-muted-foreground"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: agent.color }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Deployment badges */}
                    <div className="flex items-center gap-3 mb-5">
                      {agent.deployment.includes('cloud') && (
                        <span className="flex items-center gap-1.5 text-xs text-cyan bg-cyan/10 px-3 py-1.5 rounded-full border border-cyan/20">
                          <Cloud className="w-3 h-3" />
                          Cloud
                        </span>
                      )}
                      {agent.deployment.includes('local') && (
                        <span className="flex items-center gap-1.5 text-xs text-purple bg-purple/10 px-3 py-1.5 rounded-full border border-purple/20">
                          <Server className="w-3 h-3" />
                          Local
                        </span>
                      )}
                    </div>

                    {/* Link */}
                    <Link to={`/services/${agent.id}`}>
                      <motion.div
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/50 text-sm font-medium text-foreground hover:bg-cyan/10 hover:text-cyan transition-all duration-300 group/btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={tableRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">Compare Agents</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Find Your <span className="gradient-text">Perfect Match</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare capabilities across all our AI agents to identify the right fit for your
              workflow and infrastructure requirements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-x-auto rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                    Feature
                  </th>
                  {agents.map((agent) => (
                    <th
                      key={agent.id}
                      className="py-4 px-4 text-center text-sm font-semibold"
                      style={{ color: agent.color }}
                    >
                      {agent.name.replace(' Agent', '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature.key}
                    className={`border-b border-border/30 ${
                      i % 2 === 0 ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className="py-3.5 px-6 text-sm text-muted-foreground">{feature.label}</td>
                    {agents.map((agent) => {
                      const has = agentCapabilities[agent.id]?.includes(feature.key);
                      return (
                        <td key={agent.id} className="py-3.5 px-4 text-center">
                          {has ? (
                            <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
                <Zap className="w-10 h-10 text-cyan mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to <span className="gradient-text">Get Started</span>?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Deploy your first AI agent in under five minutes. Choose cloud for instant
                  scalability or on-premise for maximum data control. No credit card required to
                  start.
                </p>
                <Link to="/deploy">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                  >
                    Deploy Now
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
