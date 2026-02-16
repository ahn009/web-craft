import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  ArrowLeft,
  Cloud,
  Server,
  Shield,
  Zap,
  Globe,
  MessageSquare,
  BarChart3,
  Users,
  Bot,
  Plug,
  Workflow,
  Lock,
  Gauge,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Layers,
  Settings,
  Palette,
  Database,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import { agents } from '@/lib/agents';

const featureIcons = [Sparkles, Shield, Zap, Globe];

const useCasesData: Record<
  string,
  { title: string; description: string; icon: React.ComponentType<{ className?: string }> }[]
> = {
  whatsapp: [
    {
      title: 'E-Commerce Order Updates',
      description:
        'Automatically notify customers about order confirmations, shipping updates, and delivery estimates directly through WhatsApp. Reduce support tickets by up to 60% with proactive communication.',
      icon: MessageSquare,
    },
    {
      title: 'Appointment Scheduling',
      description:
        'Let customers book, reschedule, or cancel appointments through natural WhatsApp conversations. Integrates with Google Calendar, Calendly, and custom scheduling systems.',
      icon: Clock,
    },
    {
      title: 'Lead Qualification',
      description:
        'Capture and qualify inbound leads on WhatsApp with intelligent conversational flows. Route hot leads to your sales team in real time with full conversation context.',
      icon: Target,
    },
    {
      title: 'Multi-Location Support',
      description:
        'Manage customer inquiries across multiple branches or regions from a single WhatsApp number. Automatically route conversations based on location, language, or topic.',
      icon: Globe,
    },
  ],
  support: [
    {
      title: 'Tier-1 Ticket Resolution',
      description:
        'Resolve common support requests instantly by referencing your knowledge base, FAQs, and past tickets. Escalate complex issues to human agents with full context and sentiment analysis.',
      icon: Layers,
    },
    {
      title: 'SaaS Onboarding Assistance',
      description:
        'Guide new users through product setup, feature discovery, and best practices. Reduce churn during the critical first 30 days with personalized, context-aware walkthroughs.',
      icon: Users,
    },
    {
      title: 'IT Helpdesk Automation',
      description:
        'Handle password resets, software provisioning, and common IT requests automatically. Integrate with Active Directory, Jira Service Desk, and Zendesk for seamless ticket management.',
      icon: Settings,
    },
    {
      title: 'Proactive Issue Detection',
      description:
        'Monitor product metrics and customer behavior to identify issues before they become tickets. Alert customers with solutions or preemptive fixes, reducing inbound support volume by 40%.',
      icon: Shield,
    },
  ],
  sales: [
    {
      title: 'Outbound Prospecting',
      description:
        'Identify ideal prospects from your ICP, craft personalized outreach sequences, and manage follow-ups across email, LinkedIn, and phone. Increase meetings booked by 3x.',
      icon: Target,
    },
    {
      title: 'Deal Pipeline Management',
      description:
        'Track every deal from first touch to close. Get AI-powered forecasts, risk alerts for stalling deals, and recommended next actions to keep your pipeline moving.',
      icon: TrendingUp,
    },
    {
      title: 'Proposal Generation',
      description:
        'Generate customized proposals, quotes, and pitch decks from your templates using deal context and customer data. Cut proposal creation time from hours to minutes.',
      icon: Sparkles,
    },
    {
      title: 'Competitive Intelligence',
      description:
        'Monitor competitor pricing, feature releases, and market positioning. Equip your sales team with battle cards and objection-handling scripts tailored to each deal.',
      icon: BarChart3,
    },
  ],
  analytics: [
    {
      title: 'Revenue Forecasting',
      description:
        'Combine historical data, market signals, and pipeline metrics to generate accurate revenue forecasts. Surface anomalies and trends that manual analysis would miss.',
      icon: TrendingUp,
    },
    {
      title: 'Customer Behavior Analysis',
      description:
        'Segment users by behavior patterns, predict churn risk, and identify upsell opportunities. Turn raw product usage data into actionable growth strategies.',
      icon: Users,
    },
    {
      title: 'Operational Efficiency Audits',
      description:
        'Analyze process bottlenecks, resource utilization, and cost centers across your organization. Receive prioritized recommendations for efficiency improvements with projected ROI.',
      icon: Gauge,
    },
    {
      title: 'Marketing Attribution',
      description:
        'Track the true impact of every marketing channel, campaign, and touchpoint. Move beyond last-click attribution with AI-powered multi-touch models.',
      icon: BarChart3,
    },
  ],
  social: [
    {
      title: 'Content Calendar Automation',
      description:
        'Plan, generate, and schedule content across Instagram, Twitter/X, LinkedIn, and TikTok. Optimize posting times based on audience engagement patterns for maximum reach.',
      icon: Clock,
    },
    {
      title: 'Community Management',
      description:
        'Respond to comments, DMs, and mentions in real time with brand-consistent messaging. Flag negative sentiment for human review while handling routine interactions automatically.',
      icon: MessageSquare,
    },
    {
      title: 'Influencer Campaign Tracking',
      description:
        'Monitor influencer posts, track engagement metrics, and calculate ROI across all your influencer partnerships. Identify top performers and optimize future collaborations.',
      icon: Users,
    },
    {
      title: 'Trend-Driven Content Creation',
      description:
        'Detect emerging trends in your industry before they peak. Generate timely content suggestions and draft posts that position your brand as a thought leader.',
      icon: TrendingUp,
    },
  ],
  custom: [
    {
      title: 'Industry-Specific Workflows',
      description:
        'Build agents tailored to healthcare compliance, legal document review, financial auditing, or any industry vertical. Your domain expertise encoded into intelligent automation.',
      icon: Workflow,
    },
    {
      title: 'Internal Process Automation',
      description:
        'Automate HR onboarding, procurement approvals, expense reporting, and other internal processes. Reduce manual overhead while maintaining full audit trails.',
      icon: Settings,
    },
    {
      title: 'White-Label Client Solutions',
      description:
        'Offer AI-powered tools under your own brand to your clients. Full white-label support with custom domains, branding, and client-specific configurations.',
      icon: Palette,
    },
    {
      title: 'Legacy System Integration',
      description:
        'Connect modern AI capabilities to legacy ERP, CRM, and database systems. Bridge the gap between outdated infrastructure and cutting-edge automation without costly migrations.',
      icon: Database,
    },
  ],
};

const integrationsData: Record<string, string[]> = {
  whatsapp: ['WhatsApp Business API', 'Twilio', 'Shopify', 'WooCommerce', 'Zapier', 'HubSpot'],
  support: ['Zendesk', 'Freshdesk', 'Intercom', 'Jira', 'Confluence', 'Slack'],
  sales: ['Salesforce', 'HubSpot CRM', 'Pipedrive', 'LinkedIn Sales Nav', 'Outreach', 'Gong'],
  analytics: ['Google Analytics', 'Snowflake', 'BigQuery', 'Tableau', 'Power BI', 'Looker'],
  social: ['Meta Business Suite', 'Twitter/X API', 'LinkedIn', 'Buffer', 'Hootsuite', 'Canva'],
  custom: ['REST APIs', 'GraphQL', 'Webhooks', 'OAuth 2.0', 'SAML SSO', 'Custom SDKs'],
};

const featureDescriptions: Record<string, string[]> = {
  whatsapp: [
    'Respond to customer messages around the clock with context-aware AI that understands intent, handles follow-ups, and maintains conversation history across sessions.',
    'Communicate fluently in over 95 languages with automatic detection and translation. Maintain tone consistency and cultural nuance in every interaction.',
    'Give customers real-time order status, shipping updates, and delivery tracking directly within their WhatsApp conversation without switching apps.',
    'Seamlessly transfer complex conversations to human agents with full context, sentiment flags, and suggested responses to accelerate resolution.',
  ],
  support: [
    'Automatically index and search your documentation, FAQs, and past tickets to deliver accurate answers instantly. Continuously learns from new content.',
    'Classify and route tickets by topic, urgency, and required expertise. Ensure every issue reaches the right team member without manual triage.',
    'Detect customer frustration, confusion, or satisfaction in real time. Prioritize negative sentiment for immediate attention and track CSAT trends.',
    'Define multi-step escalation paths with automatic triggers. Set SLA timers, notification chains, and fallback protocols for critical issues.',
  ],
  sales: [
    'Score and prioritize leads based on firmographic data, engagement signals, and buying intent. Focus your team on the prospects most likely to convert.',
    'Generate personalized email sequences, LinkedIn messages, and call scripts tailored to each prospect profile, industry, and stage in the buying journey.',
    'Sync bi-directionally with Salesforce, HubSpot, Pipedrive, and other CRMs. Keep deal records, notes, and activities up to date automatically.',
    'Visualize pipeline health, conversion rates, and revenue forecasts with interactive dashboards. Identify bottlenecks and forecast accuracy in real time.',
  ],
  analytics: [
    'Monitor key metrics as they happen with auto-updating dashboards. Set intelligent alerts that notify you of anomalies and threshold breaches.',
    'Use machine learning models to forecast trends, detect patterns, and surface insights that traditional analysis cannot uncover.',
    'Build and share custom reports with drag-and-drop simplicity. Schedule automated report delivery to stakeholders via email or Slack.',
    'Transform complex datasets into clear, interactive charts, heatmaps, and geographic visualizations that make insights accessible to every team member.',
  ],
  social: [
    'Plan weeks of content in advance with AI-suggested optimal posting times. Queue posts across all platforms and review them in a unified calendar.',
    'Respond to comments, mentions, and DMs instantly with brand-consistent messaging. Filter spam and flag important conversations for human review.',
    'Track hashtags, competitor activity, and emerging topics in your industry. Receive alerts when trends align with your content strategy.',
    'Measure likes, shares, reach, and conversions across every platform. Benchmark performance against industry standards and past campaigns.',
  ],
  custom: [
    'Design every aspect of your agent, from conversation flows and decision logic to response templates and fallback behaviors. No limitations, no compromises.',
    'Connect to any third-party service through REST, GraphQL, webhooks, or custom SDKs. Build data pipelines that feed your agent real-time information.',
    'Create multi-step automation sequences with conditional branching, parallel execution, and human-in-the-loop checkpoints tailored to your operations.',
    'Deploy your AI agent under your own brand with custom domains, logos, color schemes, and terminology. Your customers see only your brand.',
  ],
};

export default function AgentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const agent = agents.find((a) => a.id === slug);

  const [overviewRef, overviewInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [useCasesRef, useCasesInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [integrationsRef, integrationsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [deployRef, deployInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <Bot className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Agent Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            The agent you are looking for does not exist or may have been removed. Browse our full
            catalog to find the right AI agent for your needs.
          </p>
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan/10 text-cyan border border-cyan/20 font-medium hover:bg-cyan/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const useCases = useCasesData[agent.id] || [];
  const integrations = integrationsData[agent.id] || [];
  const descriptions = featureDescriptions[agent.id] || [];

  return (
    <>
      <PageHero
        badge={agent.name}
        title={agent.name.replace(' Agent', '') + ' '}
        highlight="Agent"
        description={agent.description}
      />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Services
        </Link>
      </div>

      {/* Overview / Feature Cards */}
      <section ref={overviewRef} className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Core <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every feature is engineered to deliver measurable business impact from day one.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {agent.features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={overviewInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: agent.color }} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyan transition-colors">
                      {feature}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {descriptions[index] || feature}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section ref={useCasesRef} className="relative py-24 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">Use Cases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real-World <span className="gradient-text">Applications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how businesses across industries leverage the {agent.name} to drive results and
              streamline operations.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-purple/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-purple transition-colors">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section ref={integrationsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={integrationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <Plug className="w-4 h-4 text-cyan" />
              <span className="text-sm text-cyan font-medium">Integrations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Works With Your <span className="gradient-text">Favorite Tools</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect the {agent.name} to the platforms you already use. Set up integrations in
              minutes with pre-built connectors and our flexible API.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={integrationsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group flex items-center justify-center p-5 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-300 text-center"
              >
                <span className="text-sm font-medium text-muted-foreground group-hover:text-cyan transition-colors">
                  {integration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section ref={deployRef} className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan/5 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={deployInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Deployment <span className="gradient-text">Options</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the deployment model that aligns with your security requirements,
              infrastructure, and scaling strategy.
            </p>
          </motion.div>

          <div className={`grid ${agent.deployment.length > 1 ? 'sm:grid-cols-2' : 'max-w-lg mx-auto'} gap-6`}>
            {agent.deployment.includes('cloud') && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={deployInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative p-8 rounded-2xl border border-cyan/30 bg-card/50 hover:shadow-glow transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6">
                    <Cloud className="w-7 h-7 text-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Cloud Deployment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Launch instantly on our globally distributed infrastructure. Automatic scaling
                    handles traffic spikes, managed updates keep your agent current, and 99.99%
                    uptime SLA ensures reliability.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Zero infrastructure management',
                      'Auto-scaling to millions of requests',
                      'Global CDN with edge processing',
                      'Automatic security patches and updates',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Zap className="w-4 h-4 text-cyan flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {agent.deployment.includes('local') && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={deployInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative p-8 rounded-2xl border border-purple/30 bg-card/50 hover:shadow-glow transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center mb-6">
                    <Server className="w-7 h-7 text-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">On-Premise Deployment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Run the {agent.name} entirely within your own infrastructure. Complete data
                    sovereignty, compliance with strict regulatory requirements, and full control over
                    every aspect of the system.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Full data sovereignty and privacy',
                      'HIPAA, SOC 2, GDPR compliant',
                      'Air-gapped environment support',
                      'Custom hardware optimization',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4 text-purple flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
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
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}30` }}
                >
                  <Zap className="w-6 h-6" style={{ color: agent.color }} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Deploy Your <span className="gradient-text">{agent.name}</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Get started in minutes with guided setup, pre-built templates, and dedicated
                  onboarding support. No engineering resources required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  <Link to="/services">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border/50 text-muted-foreground font-medium hover:border-cyan/40 hover:text-cyan transition-all duration-300"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      All Agents
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
