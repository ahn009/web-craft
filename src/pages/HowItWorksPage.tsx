import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  MousePointerClick,
  Settings,
  Rocket,
  ArrowRight,
  CheckCircle,
  Upload,
  Code,
  BarChart3,
  ActivitySquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import PageHero from '@/components/layout/PageHero';

const steps = [
  {
    number: 1,
    title: 'Choose Your Agent',
    icon: MousePointerClick,
    description:
      'Browse our library of pre-built AI agents, each designed for a specific business function. Whether you need customer support automation, sales lead qualification, social media management, or data analytics, we have a ready-made agent waiting for you. Can not find the right fit? Our Custom Agent builder lets you define capabilities, personality, and workflows from scratch. Every agent comes with sensible defaults so you can get started immediately, then fine-tune over time.',
    highlights: [
      'Six specialized agent types covering core business functions',
      'Custom agent builder for unique requirements',
      'Preview agent behavior before committing',
      'Compare agent capabilities side by side',
    ],
  },
  {
    number: 2,
    title: 'Configure & Train',
    icon: Settings,
    description:
      'Upload your existing knowledge base, FAQs, product documentation, and conversation logs. Our training pipeline processes your data to create a contextual understanding unique to your business. Set the agent tone of voice, define escalation rules, configure integrations with your CRM, helpdesk, or messaging platform, and establish guardrails for sensitive topics. The configuration wizard guides you through each step with intelligent recommendations based on your industry.',
    highlights: [
      'Drag-and-drop knowledge base upload (PDF, CSV, JSON, URLs)',
      'Visual workflow builder for escalation paths',
      'One-click integrations with 50+ platforms',
      'Real-time training progress and quality metrics',
    ],
  },
  {
    number: 3,
    title: 'Deploy & Scale',
    icon: Rocket,
    description:
      'Choose cloud or on-premise deployment and launch your agent with a single click. Cloud agents are live within minutes with auto-scaling built in. On-premise deployments are guided by our engineering team. Once live, monitor performance through real-time dashboards showing response quality, resolution rates, customer satisfaction, and cost savings. Scale effortlessly as your needs grow, adding new agents or expanding capacity without downtime.',
    highlights: [
      'One-click deployment to cloud or on-premise',
      'Real-time performance monitoring dashboard',
      'Auto-scaling handles traffic spikes seamlessly',
      'A/B testing for continuous optimization',
    ],
  },
];

const tabContent = {
  setup: {
    title: 'Initial Setup',
    icon: Upload,
    description:
      'Getting started with WebCraft AI takes less than 10 minutes. Create your workspace, invite team members, and connect your first data source. Our onboarding wizard walks you through account configuration, billing setup, and team permissions. You will define your organization profile, set data residency preferences, and configure SSO if needed.',
    details: [
      'Create workspace with organization details and branding',
      'Invite team members with role-based access control',
      'Connect data sources: CRM, helpdesk, knowledge bases',
      'Configure SSO via SAML 2.0 or OpenID Connect',
      'Set data residency region and encryption preferences',
      'Review and accept data processing agreement',
    ],
  },
  training: {
    title: 'Agent Training',
    icon: Code,
    description:
      'Training is where your agent becomes uniquely yours. Our pipeline ingests your documents, extracts structured knowledge, and builds a semantic index that powers intelligent retrieval. You can review extracted knowledge, correct misunderstandings, and add custom Q&A pairs. Training typically completes in under an hour for standard knowledge bases and scales to millions of documents for enterprise deployments.',
    details: [
      'Upload documents in 20+ formats including PDF, Word, HTML, and Markdown',
      'Automatic chunking, embedding, and semantic indexing',
      'Review and curate extracted knowledge entries',
      'Add custom Q&A pairs for high-priority topics',
      'Run automated evaluation against test scenarios',
      'Fine-tune response style, length, and tone parameters',
    ],
  },
  deployment: {
    title: 'Going Live',
    icon: Rocket,
    description:
      'Deployment is automated and reversible. Select your target environment, review the pre-flight checklist, and hit deploy. The system runs health checks, validates model integrity, and provisions infrastructure. You receive a live endpoint, embed code for web widgets, and webhook URLs for platform integrations. Rollbacks to any previous version are one click away.',
    details: [
      'Choose between cloud, on-premise, or hybrid deployment',
      'Automated pre-flight checks validate configuration completeness',
      'Zero-downtime blue-green deployment strategy',
      'Receive API endpoint, widget embed code, and webhooks',
      'Configure rate limits, IP allowlisting, and CORS policies',
      'Instant rollback to any previous deployment version',
    ],
  },
  monitoring: {
    title: 'Ongoing Monitoring',
    icon: BarChart3,
    description:
      'Once deployed, your dashboard provides a comprehensive view of agent performance. Track conversation volume, resolution rates, average handling time, customer satisfaction scores, and cost-per-interaction in real time. Set alerts for anomalies, schedule weekly performance reports, and use our optimization recommendations to continuously improve your agent effectiveness.',
    details: [
      'Real-time dashboard with conversation volume and resolution metrics',
      'Customer satisfaction score tracking with trend analysis',
      'Cost-per-interaction and ROI calculation reports',
      'Anomaly detection with configurable alert thresholds',
      'Weekly automated performance summary emails',
      'AI-powered optimization recommendations based on conversation data',
    ],
  },
};

const faqItems = [
  {
    id: 'how-1',
    question: 'How long does the entire setup process take?',
    answer:
      'For most organizations, the end-to-end process from account creation to live agent takes between 30 minutes and 2 hours. The speed depends on the size of your knowledge base and the complexity of your integration requirements. Cloud deployments are fastest, while on-premise installations require additional coordination with our engineering team.',
  },
  {
    id: 'how-2',
    question: 'Do I need technical expertise to configure an agent?',
    answer:
      'No. Our platform is designed for business users with zero coding requirements. The visual workflow builder, drag-and-drop knowledge upload, and guided configuration wizard handle everything. However, for advanced customizations like custom API integrations or webhook logic, basic technical knowledge is helpful. Our support team is available to assist with any technical setup.',
  },
  {
    id: 'how-3',
    question: 'Can I update the knowledge base after deployment?',
    answer:
      'Absolutely. Your knowledge base is a living resource. You can add, update, or remove documents at any time through the dashboard. Changes are processed incrementally, meaning only new or modified content needs reindexing. Updates typically propagate to the live agent within 5 minutes without any downtime or redeployment needed.',
  },
  {
    id: 'how-4',
    question: 'What happens if the AI cannot answer a question?',
    answer:
      'When the agent encounters a question outside its knowledge or confidence threshold, it follows your configured escalation workflow. This can include transferring to a human agent, creating a support ticket, collecting contact information for follow-up, or providing a curated fallback response. You have full control over escalation triggers and routing rules.',
  },
  {
    id: 'how-5',
    question: 'How does the agent improve over time?',
    answer:
      'The agent continuously learns through several mechanisms. Conversation feedback from customers and agents feeds into regular model updates. Our analytics engine identifies common failure patterns and suggests knowledge base additions. You can also run A/B tests on response strategies to optimize for resolution rate and satisfaction. Monthly retraining cycles incorporate all improvements.',
  },
];

export default function HowItWorksPage() {
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [tabsRef, tabsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="How It Works"
        title="Three Simple Steps to"
        highlight="AI Automation"
        description="From selecting your agent to deploying at scale, our streamlined process gets you operational in minutes, not months."
      />

      {/* Steps Section */}
      <section ref={stepsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Path to <span className="gradient-text">Intelligent Automation</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each step is designed to be intuitive, guided, and fast. No engineering degree required.
            </p>
          </motion.div>

          <div className="space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={stepsInView ? { opacity: 1, scaleY: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.3 }}
                      className="absolute left-8 top-full w-0.5 h-12 bg-gradient-to-b from-cyan/50 to-purple/50 origin-top z-10"
                    />
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative bg-card/50 border border-border/50 rounded-2xl p-8 mb-12 hover:border-cyan/30 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/20 to-purple/20 border border-cyan/30 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-cyan" />
                        </div>
                        <span className="text-3xl font-bold gradient-text">0{step.number}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {step.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-cyan flex-shrink-0 mt-1" />
                              <span className="text-sm text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Deep-Dive Tabs */}
      <section ref={tabsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tabsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Deep Dive</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore each phase of the process in detail to understand exactly what happens under the hood.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tabsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-secondary/50 rounded-xl p-1 h-auto">
                {Object.entries(tabContent).map(([key, tab]) => {
                  const TabIcon = tab.icon;
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-cyan/10 data-[state=active]:text-cyan data-[state=active]:border-cyan/30 text-xs sm:text-sm"
                    >
                      <TabIcon className="w-4 h-4 hidden sm:block" />
                      {tab.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.entries(tabContent).map(([key, tab]) => {
                const TabIcon = tab.icon;
                return (
                  <TabsContent key={key} value={key} className="mt-8">
                    <div className="bg-card/50 border border-border/50 rounded-2xl p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center">
                          <TabIcon className="w-6 h-6 text-cyan" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{tab.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-8">{tab.description}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {tab.details.map((detail, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4"
                          >
                            <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-cyan">{i + 1}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about getting started with WebCraft AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-card/50 border border-border/50 rounded-xl px-6 data-[state=open]:border-cyan/30 transition-colors"
                >
                  <AccordionTrigger className="text-base font-semibold hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-8">
              <ActivitySquare className="w-4 h-4 text-cyan" />
              <span className="text-sm text-cyan font-medium">Ready in minutes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Start Building Your <span className="gradient-text">AI Agent</span> Now
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Follow the three steps above and have your first agent live before your next coffee break.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan text-black hover:bg-cyan/90 font-semibold px-8">
                <Link to="/deploy">
                  Deploy Your Agent
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/50 hover:border-cyan/30">
                <Link to="/contact">Need Help? Talk to Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
