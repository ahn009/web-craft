import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/layout/PageHero';
import { BookOpen } from 'lucide-react';

type EntryCategory = 'Feature' | 'Fix' | 'Improvement';

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: string[];
  category: EntryCategory;
}

const categoryStyles: Record<EntryCategory, { bg: string; text: string }> = {
  Feature: { bg: 'bg-cyan/10', text: 'text-cyan' },
  Improvement: { bg: 'bg-purple/10', text: 'text-purple' },
  Fix: { bg: 'bg-amber-500/10', text: 'text-amber-500' },
};

const entries: ChangelogEntry[] = [
  {
    version: 'v3.2.0',
    date: 'February 10, 2026',
    title: 'Multi-Language Auto-Detection',
    description:
      'The NLP engine can now automatically detect the language of an incoming message and respond in kind, removing the need for users to manually select their preferred language.',
    changes: [
      'Added automatic language detection supporting 95+ languages',
      'Introduced per-conversation language override settings',
      'Improved translation accuracy for low-resource languages by 34%',
      'New language analytics widget on the dashboard',
    ],
    category: 'Feature',
  },
  {
    version: 'v3.1.2',
    date: 'January 28, 2026',
    title: 'Webhook Reliability Patch',
    description:
      'Addressed intermittent delivery failures in the webhook system that caused some events to be dropped under high-throughput conditions.',
    changes: [
      'Fixed race condition in the webhook queue processor',
      'Added automatic retry with exponential backoff for failed deliveries',
      'Improved webhook delivery success rate from 99.2% to 99.97%',
      'Added dead-letter queue for permanently failed events',
    ],
    category: 'Fix',
  },
  {
    version: 'v3.1.0',
    date: 'January 15, 2026',
    title: 'Conversation Memory Enhancements',
    description:
      'Long-term memory now supports structured entity extraction, allowing your AI to recall specific facts about users across sessions with higher precision.',
    changes: [
      'Introduced structured entity memory with typed fields',
      'Added memory search API for programmatic access to stored context',
      'New memory management UI for reviewing and editing stored entities',
      'Configurable retention policies per entity type',
    ],
    category: 'Improvement',
  },
  {
    version: 'v3.0.1',
    date: 'December 20, 2025',
    title: 'Dashboard Performance Fix',
    description:
      'Resolved a rendering issue that caused the analytics dashboard to lag when loading datasets larger than 100,000 data points.',
    changes: [
      'Optimized chart rendering with virtualized data series',
      'Reduced initial dashboard load time by 60%',
      'Fixed memory leak in the real-time metrics WebSocket connection',
      'Corrected timezone display bug in exported CSV reports',
    ],
    category: 'Fix',
  },
  {
    version: 'v3.0.0',
    date: 'December 1, 2025',
    title: 'WebCraft AI v3 Launch',
    description:
      'The biggest release in our history introduces a completely redesigned architecture with a new inference engine, revamped dashboard, and enterprise-grade security features.',
    changes: [
      'New transformer-based NLP engine with 3x faster inference',
      'Redesigned dashboard with customizable widget layouts',
      'Added SOC 2 Type II and HIPAA compliance certifications',
      'Introduced white-label support for Enterprise plans',
      'New onboarding wizard for first-time setup',
    ],
    category: 'Feature',
  },
  {
    version: 'v2.9.0',
    date: 'November 10, 2025',
    title: 'A/B Testing Framework',
    description:
      'Run controlled experiments on your AI conversation flows to determine which prompts, tones, and strategies yield the best user outcomes.',
    changes: [
      'Built-in experiment designer with visual flow editor',
      'Statistical significance calculator with configurable confidence levels',
      'Automatic winner selection and one-click rollout',
      'Experiment history and audit log for reproducibility',
    ],
    category: 'Feature',
  },
  {
    version: 'v2.8.3',
    date: 'October 22, 2025',
    title: 'API Rate Limiting Improvements',
    description:
      'Upgraded the rate limiting system to provide more predictable throughput and clearer error responses when limits are reached.',
    changes: [
      'Switched to sliding-window rate limiting algorithm',
      'Added rate limit headers to all API responses',
      'Improved 429 error responses with retry-after guidance',
      'New usage dashboard showing real-time API consumption',
    ],
    category: 'Improvement',
  },
  {
    version: 'v2.8.0',
    date: 'October 5, 2025',
    title: 'Shopify & WooCommerce Integrations',
    description:
      'E-commerce teams can now connect their storefronts to WebCraft AI for automated product recommendations, order status lookups, and checkout assistance.',
    changes: [
      'One-click Shopify app installation from the Shopify App Store',
      'WooCommerce plugin with automatic product catalog sync',
      'AI-powered product recommendation engine based on browsing context',
      'Real-time order tracking responses using storefront APIs',
    ],
    category: 'Feature',
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

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        badge="Changelog"
        title="What's New in"
        highlight="WebCraft AI"
        description="Stay up to date with the latest features, improvements, and fixes shipped by our team."
      />

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-border/50" />

            <div className="space-y-12">
              {entries.map((entry, index) => {
                const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
                const styles = categoryStyles[entry.category];

                return (
                  <motion.div
                    ref={ref}
                    key={entry.version}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative pl-12 md:pl-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-[12px] md:left-[16px] top-1 w-[15px] h-[15px] rounded-full border-2 border-background ${
                        entry.category === 'Feature'
                          ? 'bg-cyan'
                          : entry.category === 'Improvement'
                          ? 'bg-purple'
                          : 'bg-amber-500'
                      }`}
                    />

                    <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-border transition-colors">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}>
                          {entry.version}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
                          {entry.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-semibold text-foreground mb-2">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.description}</p>

                      {/* Changes list */}
                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                entry.category === 'Feature'
                                  ? 'bg-cyan'
                                  : entry.category === 'Improvement'
                                  ? 'bg-purple'
                                  : 'bg-amber-500'
                              }`}
                            />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
                  Want to Learn <span className="gradient-text">More</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Dive into our documentation for detailed guides on every feature, API reference, and best practices for getting the most out of WebCraft AI.
                </p>
                <Button asChild size="lg" className="bg-cyan hover:bg-cyan/90 text-white">
                  <Link to="/documentation">
                    View Documentation <BookOpen className="w-4 h-4 ml-2" />
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
