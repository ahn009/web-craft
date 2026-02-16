import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/layout/PageHero';
import {
  ArrowRight,
  MessageSquare,
  BarChart3,
  Cloud,
  ShoppingCart,
  Headphones,
  Users,
  MessageCircle,
  Slack,
  Phone,
  Send,
  TrendingUp,
  Activity,
  AudioLines,
  Server,
  Database,
  Globe,
  Store,
  Package,
  LifeBuoy,
  Smile,
  BookOpen,
} from 'lucide-react';

type Category = 'CRM' | 'Messaging' | 'Analytics' | 'Cloud' | 'E-Commerce' | 'Support';

interface Integration {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: Category;
}

const categories: { key: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'CRM', label: 'CRM', icon: Users },
  { key: 'Messaging', label: 'Messaging', icon: MessageSquare },
  { key: 'Analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'Cloud', label: 'Cloud', icon: Cloud },
  { key: 'E-Commerce', label: 'E-Commerce', icon: ShoppingCart },
  { key: 'Support', label: 'Support', icon: Headphones },
];

const integrations: Integration[] = [
  // CRM
  {
    name: 'Salesforce',
    description: 'Sync leads, contacts, and deal stages bidirectionally so your AI assistant always has the latest CRM context.',
    icon: Users,
    category: 'CRM',
  },
  {
    name: 'HubSpot',
    description: 'Automatically log conversations as activities and create new contacts from AI-captured information in HubSpot.',
    icon: TrendingUp,
    category: 'CRM',
  },
  {
    name: 'Pipedrive',
    description: 'Push qualified leads and conversation summaries directly into your Pipedrive pipeline without manual entry.',
    icon: Activity,
    category: 'CRM',
  },
  // Messaging
  {
    name: 'WhatsApp',
    description: 'Deploy your AI assistant on WhatsApp Business API to engage billions of users on their preferred messaging platform.',
    icon: MessageCircle,
    category: 'Messaging',
  },
  {
    name: 'Slack',
    description: 'Install the WebCraft bot in any Slack workspace to provide instant AI-powered answers to internal team questions.',
    icon: Slack,
    category: 'Messaging',
  },
  {
    name: 'Microsoft Teams',
    description: 'Embed your AI assistant directly in Teams channels and chats for seamless enterprise collaboration support.',
    icon: Phone,
    category: 'Messaging',
  },
  {
    name: 'Telegram',
    description: 'Launch a Telegram bot connected to your WebCraft AI in minutes with automatic command registration.',
    icon: Send,
    category: 'Messaging',
  },
  // Analytics
  {
    name: 'Google Analytics',
    description: 'Stream conversation events as custom GA4 events to correlate AI interactions with website behavior.',
    icon: TrendingUp,
    category: 'Analytics',
  },
  {
    name: 'Mixpanel',
    description: 'Track granular user journeys through your AI assistant with Mixpanel event tracking and funnel analysis.',
    icon: Activity,
    category: 'Analytics',
  },
  {
    name: 'Amplitude',
    description: 'Combine AI conversation data with product analytics in Amplitude to understand the full user journey.',
    icon: AudioLines,
    category: 'Analytics',
  },
  // Cloud
  {
    name: 'AWS',
    description: 'Deploy WebCraft AI within your AWS VPC using CloudFormation templates for maximum data sovereignty and compliance.',
    icon: Server,
    category: 'Cloud',
  },
  {
    name: 'Google Cloud',
    description: 'Run on GCP with native integrations to Vertex AI, BigQuery, and Cloud Run for a fully managed experience.',
    icon: Database,
    category: 'Cloud',
  },
  {
    name: 'Azure',
    description: 'Provision on Azure with ARM templates and integrate with Azure Active Directory for single sign-on.',
    icon: Globe,
    category: 'Cloud',
  },
  // E-Commerce
  {
    name: 'Shopify',
    description: 'Add AI-powered product recommendations and order tracking directly in your Shopify storefront.',
    icon: Store,
    category: 'E-Commerce',
  },
  {
    name: 'WooCommerce',
    description: 'Install the WebCraft plugin to provide real-time inventory answers and checkout assistance on WordPress.',
    icon: Package,
    category: 'E-Commerce',
  },
  // Support
  {
    name: 'Zendesk',
    description: 'Automatically create and update Zendesk tickets from AI conversations and route complex issues to agents.',
    icon: LifeBuoy,
    category: 'Support',
  },
  {
    name: 'Freshdesk',
    description: 'Deflect common support queries with AI and escalate to Freshdesk agents when human assistance is needed.',
    icon: Smile,
    category: 'Support',
  },
  {
    name: 'Intercom',
    description: 'Enhance Intercom Messenger with WebCraft AI to resolve issues instantly before they reach your support team.',
    icon: Headphones,
    category: 'Support',
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

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('CRM');

  const filteredIntegrations = integrations.filter((i) => i.category === activeCategory);

  return (
    <>
      <PageHero
        badge="Integrations"
        title="Connect with Your"
        highlight="Favorite Tools"
        description="WebCraft AI integrates with the platforms your team already uses, so you can deploy intelligent assistants without disrupting existing workflows."
      />

      {/* Category Tabs + Integration Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select a category below to explore our pre-built integrations, each configurable in just a few clicks.
            </p>
          </AnimatedSection>

          {/* Tabs */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.key
                      ? 'bg-cyan text-white shadow-lg shadow-cyan/20'
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration, index) => {
              const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
              return (
                <motion.div
                  ref={ref}
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                    <integration.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{integration.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Integration Spotlight: WhatsApp */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative p-10 md:p-14 rounded-3xl bg-card/50 border border-cyan/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5" />
              <div className="relative flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 rounded-2xl bg-cyan/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-10 h-10 text-cyan" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 mb-4">
                    <span className="text-xs font-semibold text-cyan">Featured Integration</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">WhatsApp Business API</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Reach over two billion active WhatsApp users with an AI assistant that handles product inquiries, appointment scheduling, order tracking, and support conversations around the clock. Our WhatsApp integration supports rich media messages including images, documents, and interactive buttons, allowing your AI to deliver engaging experiences that feel native to the platform.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                      Template message management with automatic approval tracking
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                      End-to-end encryption maintained for all AI-powered conversations
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                      Seamless handoff to human agents via the WhatsApp Flows API
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                      Multi-language auto-detection for global customer bases
                    </li>
                  </ul>
                  <Button asChild size="lg" className="bg-cyan hover:bg-cyan/90 text-white">
                    <Link to="/documentation">
                      Read the Docs <BookOpen className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="p-12 rounded-3xl bg-card/50 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-cyan/5" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Don't See Your Tool? <span className="gradient-text">We've Got You</span>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our REST API and webhook system let you connect to virtually any platform. Check our documentation for custom integration guides.
                </p>
                <Button asChild size="lg" className="bg-cyan hover:bg-cyan/90 text-white">
                  <Link to="/documentation">
                    View Documentation <ArrowRight className="w-4 h-4 ml-2" />
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
