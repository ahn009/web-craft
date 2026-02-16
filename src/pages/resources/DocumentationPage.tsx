import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  BookOpen,
  Settings,
  Code2,
  Rocket,
  Shield,
  Bug,
  MessageSquare,
  Headphones,
  TrendingUp,
  BarChart3,
  Share2,
  Wrench,
  Download,
  Cog,
  Zap,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const quickStartSteps = [
  {
    step: '01',
    title: 'Install SDK',
    description:
      'Install the WebCraft AI SDK using your preferred package manager. Supports npm, yarn, and pnpm with full TypeScript definitions included out of the box.',
    code: 'npm install @webcraft-ai/sdk',
    icon: Download,
  },
  {
    step: '02',
    title: 'Configure Agent',
    description:
      'Set up your AI agent with a simple configuration object. Define behavior rules, training data sources, response templates, and integration endpoints in one place.',
    code: 'const agent = new WebCraftAgent({ type: "support" })',
    icon: Cog,
  },
  {
    step: '03',
    title: 'Deploy',
    description:
      'Deploy your agent to production with a single command. Choose between cloud-hosted infrastructure or on-premise deployment for complete data sovereignty.',
    code: 'agent.deploy({ target: "cloud" })',
    icon: Rocket,
  },
];

const docCategories = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description:
      'Learn the fundamentals of WebCraft AI. Walk through installation, project setup, environment configuration, and deploy your first agent in under five minutes.',
    link: '/documentation/getting-started',
    color: 'cyan',
  },
  {
    icon: Settings,
    title: 'Agent Configuration',
    description:
      'Deep dive into agent configuration options including personality tuning, response templates, escalation rules, context windows, and memory management.',
    link: '/documentation/configuration',
    color: 'purple',
  },
  {
    icon: Code2,
    title: 'API Reference',
    description:
      'Complete reference for the WebCraft AI REST API. Explore endpoints for agent management, conversation handling, analytics retrieval, and webhook configuration.',
    link: '/api-reference',
    color: 'cyan',
  },
  {
    icon: Rocket,
    title: 'Deployment Guide',
    description:
      'Step-by-step guides for deploying agents to cloud platforms, on-premise servers, and hybrid environments. Includes CI/CD pipeline examples and scaling strategies.',
    link: '/documentation/deployment',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Security',
    description:
      'Understand our security architecture, data encryption standards, compliance certifications, role-based access controls, and audit logging capabilities.',
    link: '/documentation/security',
    color: 'cyan',
  },
  {
    icon: Bug,
    title: 'Troubleshooting',
    description:
      'Common issues and their solutions. Covers connection errors, deployment failures, performance bottlenecks, integration conflicts, and debugging techniques.',
    link: '/documentation/troubleshooting',
    color: 'purple',
  },
];

const agentGuides = [
  {
    icon: MessageSquare,
    title: 'WhatsApp Agent',
    description:
      'Build conversational WhatsApp bots with rich media support, quick replies, and multi-language capabilities.',
  },
  {
    icon: Headphones,
    title: 'Support Agent',
    description:
      'Configure intelligent support agents with ticket routing, sentiment analysis, and automatic escalation workflows.',
  },
  {
    icon: TrendingUp,
    title: 'Sales Agent',
    description:
      'Create sales-focused agents that qualify leads, schedule demos, and integrate with your CRM pipeline.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Agent',
    description:
      'Deploy agents that transform raw data into actionable insights with natural language querying.',
  },
  {
    icon: Share2,
    title: 'Social Media Agent',
    description:
      'Manage social media interactions at scale with automated responses, content scheduling, and engagement tracking.',
  },
  {
    icon: Wrench,
    title: 'Custom Agent',
    description:
      'Build fully custom agents tailored to your unique business logic with our flexible agent framework.',
  },
];

export default function DocumentationPage() {
  const [quickStartRef, quickStartInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [guidesRef, guidesInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Documentation"
        title="Everything You Need to"
        highlight="Get Started"
        description="Comprehensive guides, API references, and tutorials to help you build, configure, and deploy AI agents with WebCraft AI. From first install to production-grade deployment."
      />

      {/* Quick Start Guide */}
      <section ref={quickStartRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={quickStartInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <span className="text-sm text-cyan font-medium">Quick Start</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Up and Running in <span className="gradient-text">Three Steps</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Go from zero to a fully deployed AI agent in minutes. Our streamlined setup process
              gets you building immediately with sensible defaults and clear guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickStartSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={quickStartInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative"
                >
                  <div className="relative h-full p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-5xl font-bold text-cyan/20">{item.step}</span>
                        <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-cyan" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-cyan transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="px-4 py-3 rounded-lg bg-secondary/50 border border-border/50">
                        <code className="text-sm text-cyan font-mono">{item.code}</code>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section ref={categoriesRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">Browse Docs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Documentation <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our documentation organized by topic. Whether you need setup help, API details,
              or security guidance, find exactly what you need.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={cat.link}>
                    <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 rounded-xl ${
                            cat.color === 'cyan' ? 'bg-cyan/10 border-cyan/20' : 'bg-purple/10 border-purple/20'
                          } border flex items-center justify-center mb-5`}
                        >
                          <Icon className={`w-6 h-6 ${cat.color === 'cyan' ? 'text-cyan' : 'text-purple'}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyan transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {cat.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-cyan font-medium">
                          Read More
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agent-Specific Guides */}
      <section ref={guidesRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={guidesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <span className="text-sm text-cyan font-medium">Agent Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Guides for Every <span className="gradient-text">Agent Type</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each agent type has its own dedicated guide with configuration examples, best practices,
              and integration patterns tailored to its specific use case.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agentGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={guidesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-5 rounded-xl border border-border/50 bg-card/50 hover:border-purple/40 transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-purple transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
                  Need <span className="gradient-text">Help</span>?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Our team of AI specialists is ready to help you navigate the documentation,
                  troubleshoot issues, or plan your integration strategy. Reach out anytime.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                  >
                    Contact Support
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
