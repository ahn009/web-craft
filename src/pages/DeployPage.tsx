import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  CheckCircle,
  Cloud,
  Server,
  Upload,
  Globe,
  Rocket,
  MessageSquare,
  HeadphonesIcon,
  TrendingUp,
  BarChart3,
  Share2,
  Wrench,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { agents } from '@/lib/agents';
import PageHero from '@/components/layout/PageHero';

const agentIconMap: Record<string, typeof MessageSquare> = {
  whatsapp: MessageSquare,
  support: HeadphonesIcon,
  sales: TrendingUp,
  analytics: BarChart3,
  social: Share2,
  custom: Wrench,
};

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Portuguese',
  'Japanese',
  'Chinese (Simplified)',
  'Arabic',
  'Hindi',
  'Korean',
  'Italian',
  'Dutch',
];

export default function DeployPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedDeployment, setSelectedDeployment] = useState<'cloud' | 'on-premise' | null>(null);

  const [agentRef, agentInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [configRef, configInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [deployRef, deployInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [summaryRef, summaryInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const selectedAgentData = agents.find((a) => a.id === selectedAgent);

  return (
    <>
      <PageHero
        badge="Get Started"
        title="Deploy Your"
        highlight="AI Agent"
        description="Follow the steps below to select, configure, and launch your AI agent. The entire process takes just minutes."
      />

      {/* Step 1: Agent Selection */}
      <section ref={agentRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={agentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                <span className="text-sm font-bold text-cyan">1</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Select Your <span className="gradient-text">Agent</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg ml-14">
              Choose the agent that best fits your use case. Each agent is purpose-built with specialized capabilities.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => {
              const Icon = agentIconMap[agent.id] || Wrench;
              const isSelected = selectedAgent === agent.id;
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={agentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <button
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`w-full text-left bg-card/50 border rounded-2xl p-6 transition-all duration-300 group cursor-pointer ${
                      isSelected
                        ? 'border-cyan shadow-glow ring-1 ring-cyan/20'
                        : 'border-border/50 hover:border-cyan/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${agent.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: agent.color }} />
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-cyan flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {agent.description}
                    </p>
                    <ul className="space-y-2">
                      {agent.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan/60 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
                      {agent.deployment.map((type) => (
                        <span
                          key={type}
                          className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground capitalize"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step 2: Configuration */}
      <section ref={configRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={configInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple/10 border border-purple/30 flex items-center justify-center">
                <span className="text-sm font-bold text-purple">2</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Configure Your <span className="gradient-text">Agent</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg ml-14">
              Personalize your agent with a name, knowledge base, and language preferences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Agent Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={configInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-cyan/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Agent Name</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Give your agent a recognizable name that your customers and team will see.
              </p>
              <div className="bg-secondary/50 border border-border/50 rounded-xl px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {selectedAgentData ? `My ${selectedAgentData.name}` : 'e.g., Support Assistant'}
                </span>
              </div>
            </motion.div>

            {/* Knowledge Base */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={configInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-cyan/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center mb-4">
                <Upload className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Knowledge Base</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload documents, FAQs, and resources to train your agent on your business context.
              </p>
              <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-cyan/30 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop files or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, CSV, JSON, TXT, MD (max 50MB)
                </p>
              </div>
            </motion.div>

            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={configInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-cyan/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Languages</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select the languages your agent should support for customer interactions.
              </p>
              <div className="flex flex-wrap gap-2">
                {languages.slice(0, 8).map((lang) => (
                  <span
                    key={lang}
                    className="text-xs px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-muted-foreground hover:border-cyan/30 hover:text-cyan transition-colors cursor-pointer"
                  >
                    {lang}
                  </span>
                ))}
                <span className="text-xs px-3 py-1.5 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan font-medium cursor-pointer">
                  +{languages.length - 8} more
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Step 3: Deployment Type */}
      <section ref={deployRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={deployInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                <span className="text-sm font-bold text-cyan">3</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Choose <span className="gradient-text">Deployment</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg ml-14">
              Select where your agent will run. You can always migrate between options later.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cloud */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={deployInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <button
                onClick={() => setSelectedDeployment('cloud')}
                className={`w-full text-left bg-card/50 border rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  selectedDeployment === 'cloud'
                    ? 'border-cyan shadow-glow ring-1 ring-cyan/20'
                    : 'border-border/50 hover:border-cyan/30'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center">
                      <Cloud className="w-7 h-7 text-cyan" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Cloud</h3>
                      <p className="text-sm text-muted-foreground">Managed infrastructure</p>
                    </div>
                  </div>
                  {selectedDeployment === 'cloud' && (
                    <div className="w-6 h-6 rounded-full bg-cyan flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
                <ul className="space-y-3">
                  {[
                    'Live in under 5 minutes',
                    'Auto-scaling and load balancing',
                    'Zero maintenance required',
                    'Pay-as-you-go pricing',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-cyan flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-xs text-cyan font-medium">
                    Recommended for most teams
                  </span>
                </div>
              </button>
            </motion.div>

            {/* On-Premise */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={deployInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => setSelectedDeployment('on-premise')}
                className={`w-full text-left bg-card/50 border rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  selectedDeployment === 'on-premise'
                    ? 'border-purple shadow-glow ring-1 ring-purple/20'
                    : 'border-border/50 hover:border-purple/30'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-purple/10 flex items-center justify-center">
                      <Server className="w-7 h-7 text-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">On-Premise</h3>
                      <p className="text-sm text-muted-foreground">Full data sovereignty</p>
                    </div>
                  </div>
                  {selectedDeployment === 'on-premise' && (
                    <div className="w-6 h-6 rounded-full bg-purple flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
                <ul className="space-y-3">
                  {[
                    'Data stays within your firewall',
                    'Custom hardware acceleration',
                    'Active Directory integration',
                    'Dedicated installation support',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-purple flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-xs text-purple font-medium">
                    Best for regulated industries
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Summary & CTA */}
      <section ref={summaryRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={summaryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Summary Card */}
            <div className="bg-card/50 border border-border/50 rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Deployment <span className="gradient-text">Summary</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Agent</span>
                  <span className="text-sm font-medium text-foreground">
                    {selectedAgentData ? selectedAgentData.name : 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Deployment</span>
                  <span className="text-sm font-medium text-foreground capitalize">
                    {selectedDeployment || 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Knowledge Base</span>
                  <span className="text-sm text-muted-foreground">Pending upload</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">Estimated Time</span>
                  <span className="text-sm font-medium text-cyan">
                    {selectedDeployment === 'on-premise' ? '2-5 business days' : 'Under 5 minutes'}
                  </span>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="text-center">
              <Button
                size="lg"
                disabled={!selectedAgent || !selectedDeployment}
                className="bg-gradient-to-r from-cyan to-purple text-black font-bold px-12 py-6 text-lg rounded-xl hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed h-auto"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Launch Agent
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                {!selectedAgent && !selectedDeployment
                  ? 'Select an agent and deployment type above to continue'
                  : !selectedAgent
                    ? 'Select an agent above to continue'
                    : !selectedDeployment
                      ? 'Choose a deployment option above to continue'
                      : 'Your agent will be provisioned and ready to use'}
              </p>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan transition-colors"
                >
                  Need help deciding? Talk to our team
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
