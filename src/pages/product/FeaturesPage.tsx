import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/layout/PageHero';
import {
  Brain,
  MessageSquare,
  BarChart3,
  GraduationCap,
  Code2,
  Shield,
  Webhook,
  FlaskConical,
  DatabaseZap,
  Scaling,
  Globe,
  Paintbrush,
  ArrowRight,
  Check,
  X,
  Plug,
  LineChart,
  Cloud,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'NLP Engine',
    description:
      'Our advanced natural language processing engine understands context, intent, and sentiment with human-level accuracy. Process complex queries across multiple domains without manual rule configuration.',
  },
  {
    icon: MessageSquare,
    title: 'Multi-Channel',
    description:
      'Deploy your AI assistant across web, mobile, WhatsApp, Slack, and more from a single dashboard. Maintain consistent conversation context as users switch between channels seamlessly.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track conversation metrics, user satisfaction, and resolution rates in real time with interactive charts. Identify trends and bottlenecks to continuously improve your AI performance.',
  },
  {
    icon: GraduationCap,
    title: 'Custom Training',
    description:
      'Train your AI on proprietary data, product documentation, and past conversation logs with zero-code tools. Fine-tune responses to match your brand voice and domain expertise.',
  },
  {
    icon: Code2,
    title: 'API Access',
    description:
      'Integrate WebCraft AI into any application with our RESTful API and SDKs for Python, Node.js, and Go. Comprehensive documentation and sandbox environments make development a breeze.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description:
      'Control who can view, edit, and deploy AI configurations with granular role-based permissions. Audit logs track every change so your team stays compliant and accountable.',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description:
      'Trigger actions in external systems whenever specific conversation events occur using configurable webhooks. Automate workflows like ticket creation, CRM updates, and escalation alerts.',
  },
  {
    icon: FlaskConical,
    title: 'A/B Testing',
    description:
      'Run controlled experiments on conversation flows, response styles, and prompt variations simultaneously. Measure statistical significance and roll out winning variants with one click.',
  },
  {
    icon: DatabaseZap,
    title: 'Conversation Memory',
    description:
      'Maintain long-term context across sessions so your AI remembers user preferences and past interactions. Configurable retention policies let you balance personalization with privacy.',
  },
  {
    icon: Scaling,
    title: 'Auto-Scaling',
    description:
      'Handle traffic spikes effortlessly with infrastructure that scales from tens to millions of concurrent sessions. Pay only for what you use with automatic resource provisioning and de-provisioning.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description:
      'Support over 95 languages out of the box with automatic detection and real-time translation capabilities. Serve global audiences without maintaining separate bots for each locale.',
  },
  {
    icon: Paintbrush,
    title: 'White-Label',
    description:
      'Remove all WebCraft branding and customize every visual element to match your product identity. Embed the AI experience natively so it feels like a first-party feature to your users.',
  },
];

const comparisonRows = [
  { feature: 'Setup Time', webcraft: 'Minutes', traditional: 'Weeks to months' },
  { feature: 'Natural Language Understanding', webcraft: 'Context-aware AI', traditional: 'Keyword matching' },
  { feature: 'Scalability', webcraft: 'Auto-scaling infrastructure', traditional: 'Manual server provisioning' },
  { feature: 'Training Required', webcraft: 'Zero-code fine-tuning', traditional: 'Developer-intensive' },
  { feature: 'Multi-Channel Support', webcraft: 'Unified out of the box', traditional: 'Separate per channel' },
  { feature: 'Analytics & Insights', webcraft: 'Real-time dashboards', traditional: 'Manual report generation' },
];

const integrationCategories = [
  {
    icon: Plug,
    title: 'CRM Systems',
    description:
      'Sync customer data bidirectionally with Salesforce, HubSpot, and Pipedrive. Enrich conversations with contact history and deal context automatically.',
    color: 'cyan' as const,
  },
  {
    icon: MessageSquare,
    title: 'Messaging Platforms',
    description:
      'Connect natively with WhatsApp, Slack, Microsoft Teams, and Telegram. Users interact on their preferred platform while you manage everything centrally.',
    color: 'purple' as const,
  },
  {
    icon: LineChart,
    title: 'Analytics Tools',
    description:
      'Stream conversation events to Google Analytics, Mixpanel, and Amplitude. Combine AI interaction data with your existing product analytics.',
    color: 'cyan' as const,
  },
  {
    icon: Cloud,
    title: 'Cloud Providers',
    description:
      'Deploy on AWS, Google Cloud, or Azure within your own VPC for maximum data sovereignty. One-click provisioning with Terraform templates included.',
    color: 'purple' as const,
  },
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
        <feature.icon className="w-6 h-6 text-cyan" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

function IntegrationCategoryCard({
  category,
  index,
}: {
  category: (typeof integrationCategories)[number];
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
    >
      <div
        className={`w-14 h-14 rounded-xl ${
          category.color === 'cyan' ? 'bg-cyan/10' : 'bg-purple/10'
        } flex items-center justify-center mb-5`}
      >
        <category.icon
          className={`w-7 h-7 ${category.color === 'cyan' ? 'text-cyan' : 'text-purple'}`}
        />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{category.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{category.description}</p>
    </motion.div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        badge="Features"
        title="Powerful Features for"
        highlight="Modern Teams"
        description="Everything you need to build, deploy, and scale intelligent AI assistants that delight your customers and supercharge your team."
      />

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              WebCraft AI vs <span className="gradient-text">Traditional Solutions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how our modern AI platform stacks up against legacy chatbot and support automation tools.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="overflow-x-auto rounded-2xl border border-border/50">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-secondary/50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Feature</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-cyan">WebCraft AI</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Traditional</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={row.feature} className={`border-b border-border/50 ${index % 2 === 0 ? 'bg-card/50' : ''}`}>
                      <td className="py-4 px-6 text-sm font-medium text-foreground">{row.feature}</td>
                      <td className="py-4 px-6 text-sm text-cyan flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan shrink-0" />
                        {row.webcraft}
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <X className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                          {row.traditional}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Integration Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Integration <span className="gradient-text">Highlights</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect WebCraft AI to the tools your team already relies on with pre-built integrations that take minutes to configure.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integrationCategories.map((category, index) => (
              <IntegrationCategoryCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="p-12 rounded-3xl bg-card/50 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to <span className="gradient-text">Get Started</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Deploy your first AI assistant in minutes. No credit card required for the free trial.
                </p>
                <Button asChild size="lg" className="bg-cyan hover:bg-cyan/90 text-white">
                  <Link to="/deploy">
                    Start Deploying <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
