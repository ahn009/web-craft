import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  BookOpen,
  FileText,
  Zap,
  CheckCircle2,
  Shield,
  Settings,
  Code2,
  Rocket,
  CreditCard,
  Users,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const supportChannels = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    availability: 'Available 24/7',
    description:
      'Get instant help from our AI-assisted support team. Start a conversation right from your dashboard and receive real-time assistance with any technical or account-related questions.',
    color: 'cyan',
  },
  {
    icon: Mail,
    title: 'Email Support',
    availability: 'Response within 4 hours',
    description:
      'Send detailed inquiries to our support team for in-depth technical assistance. Ideal for complex issues requiring code review, configuration analysis, or architectural guidance.',
    color: 'purple',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    availability: 'Business hours (9AM-6PM EST)',
    description:
      'Speak directly with a senior support engineer for urgent issues. Available for Pro and Enterprise customers during business hours with priority queue access.',
    color: 'cyan',
  },
];

const faqItems = [
  {
    question: 'How do I get started with WebCraft AI?',
    answer:
      'Getting started is straightforward. Install our SDK using npm, yarn, or pnpm, then create a configuration file specifying your agent type and behavior rules. Run the deploy command and your agent will be live in minutes. Our Quick Start guide walks you through every step with code examples.',
  },
  {
    question: 'What programming languages does the SDK support?',
    answer:
      'Our primary SDK is built for JavaScript and TypeScript with full type definitions. We also offer official SDKs for Python, Go, and Ruby. REST API access is available for any language that can make HTTP requests. Community-maintained SDKs exist for Java, C#, and PHP.',
  },
  {
    question: 'Can I deploy agents on my own infrastructure?',
    answer:
      'Yes. WebCraft AI supports cloud-hosted, on-premise, and hybrid deployment models. On-premise deployment gives you complete control over data residency and network security. We provide Docker images, Kubernetes Helm charts, and bare-metal installation scripts for self-hosted environments.',
  },
  {
    question: 'How does billing work for API usage?',
    answer:
      'Billing is based on your subscription tier and monthly API call volume. The Starter plan includes 50,000 API calls per month, Pro includes 500,000, and Enterprise offers unlimited calls with custom pricing. Overages are billed at a per-request rate specific to your plan. You can monitor usage in real time from your dashboard.',
  },
  {
    question: 'What security certifications does WebCraft AI hold?',
    answer:
      'WebCraft AI is SOC 2 Type II certified, GDPR compliant, and HIPAA eligible for healthcare customers. All data is encrypted in transit using TLS 1.3 and at rest using AES-256. We undergo annual third-party penetration testing and maintain a responsible disclosure program for security researchers.',
  },
  {
    question: 'How do I train my agent with custom data?',
    answer:
      'Custom training data can be uploaded through the dashboard or via the API. Supported formats include JSON, CSV, PDF, and plain text. Our training pipeline automatically processes, indexes, and validates your data. You can fine-tune agent responses with feedback loops and A/B testing built into the platform.',
  },
  {
    question: 'Can multiple team members manage the same agent?',
    answer:
      'Absolutely. WebCraft AI supports role-based access control with Owner, Admin, Editor, and Viewer roles. Team members can collaborate on agent configuration, review conversation logs, and manage deployments based on their assigned permissions. Audit logs track all changes for accountability.',
  },
  {
    question: 'What happens if my agent encounters a question it cannot answer?',
    answer:
      'You can configure escalation rules that define how unresolved queries are handled. Options include transferring to a human agent, sending an email notification, creating a support ticket, or providing a fallback response. The platform tracks escalation frequency to help you identify knowledge gaps for training.',
  },
];

const knowledgeBaseArticles = [
  {
    title: 'Setting Up Webhook Integrations',
    category: 'Integrations',
    icon: Settings,
  },
  {
    title: 'Understanding Agent Analytics Dashboards',
    category: 'Analytics',
    icon: FileText,
  },
  {
    title: 'Configuring Rate Limits and Quotas',
    category: 'API',
    icon: Code2,
  },
  {
    title: 'Multi-Environment Deployment Strategies',
    category: 'Deployment',
    icon: Rocket,
  },
  {
    title: 'Managing Subscription and Billing',
    category: 'Account',
    icon: CreditCard,
  },
  {
    title: 'Team Collaboration and Permissions',
    category: 'Teams',
    icon: Users,
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [channelsRef, channelsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [kbRef, kbInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [statusRef, statusInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Support"
        title="We're Here to"
        highlight="Help"
        description="Get the assistance you need through live chat, email, or phone. Browse our knowledge base, check system status, and find answers to common questions."
      />

      {/* Support Channels */}
      <section ref={channelsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={channelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <span className="text-sm text-cyan font-medium">Support Channels</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Reach Us <span className="gradient-text">Your Way</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the support channel that works best for you. Whether you need instant help
              or prefer a detailed email exchange, our team is ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={channelsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="relative h-full p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500 text-center">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl ${
                          channel.color === 'cyan' ? 'bg-cyan/10 border-cyan/20' : 'bg-purple/10 border-purple/20'
                        } border flex items-center justify-center mx-auto mb-6`}
                      >
                        <Icon
                          className={`w-8 h-8 ${channel.color === 'cyan' ? 'text-cyan' : 'text-purple'}`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-cyan transition-colors">
                        {channel.title}
                      </h3>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          channel.color === 'cyan'
                            ? 'bg-cyan/10 text-cyan border border-cyan/20'
                            : 'bg-purple/10 text-purple border border-purple/20'
                        } mb-4`}
                      >
                        {channel.availability}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section ref={faqRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to the most common questions about WebCraft AI. Cannot find what you
              are looking for? Reach out to our support team directly.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div
                  className={`rounded-xl border transition-all duration-300 ${
                    openFaq === index
                      ? 'border-cyan/40 bg-card/50 shadow-glow'
                      : 'border-border/50 bg-card/50 hover:border-border'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-base font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180 text-cyan' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section ref={kbRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={kbInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <BookOpen className="w-4 h-4 text-cyan" />
              <span className="text-sm text-cyan font-medium">Knowledge Base</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Helpful <span className="gradient-text">Articles</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In-depth guides and tutorials covering common tasks, integrations, and best practices
              to help you make the most of the WebCraft AI platform.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {knowledgeBaseArticles.map((article, index) => {
              const Icon = article.icon;
              return (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={kbInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-5 rounded-xl border border-border/50 bg-card/50 hover:border-cyan/40 transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-cyan" />
                      </div>
                      <div>
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-purple/10 text-purple border border-purple/20 mb-2">
                          {article.category}
                        </span>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-cyan transition-colors">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Status */}
      <section ref={statusRef} className="relative py-16 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statusInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-emerald-400 animate-ping opacity-50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">All Systems Operational</h3>
                    <p className="text-sm text-muted-foreground">
                      All services are running normally. API uptime: 99.98% over the last 90 days.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    API
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Dashboard
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Agents
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Secure
                  </div>
                </div>
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
                <Zap className="w-10 h-10 text-cyan mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Still Need <span className="gradient-text">Assistance</span>?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Our support team is standing by to help you resolve any issue. Whether it is a
                  quick question or a complex integration challenge, we are here for you.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                  >
                    Contact Us
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
