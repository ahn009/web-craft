import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/layout/PageHero';
import {
  Check,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Building2,
} from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    icon: Zap,
    monthlyPrice: 49,
    description: 'Perfect for small teams exploring AI-powered customer interactions.',
    popular: false,
    features: [
      '1 AI assistant',
      '5,000 conversations / month',
      'Web widget deployment',
      'Basic analytics dashboard',
      'Email support',
      'Community forum access',
      '7-day conversation history',
      'Standard NLP engine',
    ],
    cta: 'Get Started',
    ctaLink: '/deploy',
  },
  {
    name: 'Pro',
    icon: Sparkles,
    monthlyPrice: 149,
    description: 'For growing teams that need advanced features and multi-channel support.',
    popular: true,
    features: [
      '5 AI assistants',
      '50,000 conversations / month',
      'Multi-channel deployment',
      'Advanced analytics & reporting',
      'Priority email & chat support',
      'Custom training & fine-tuning',
      'A/B testing',
      '90-day conversation history',
      'API access with 100k calls / month',
      'Role-based access control',
    ],
    cta: 'Get Started',
    ctaLink: '/deploy',
  },
  {
    name: 'Enterprise',
    icon: Building2,
    monthlyPrice: null,
    description: 'Tailored solutions for organizations with complex requirements and scale.',
    popular: false,
    features: [
      'Unlimited AI assistants',
      'Unlimited conversations',
      'All channels + white-label',
      'Custom analytics & BI export',
      'Dedicated account manager',
      'On-premise / VPC deployment',
      'SSO & advanced security',
      'Unlimited conversation history',
      'Unlimited API access',
      'Custom SLA & uptime guarantee',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
  },
];

const allFeatures = [
  { name: 'AI Assistants', starter: '1', pro: '5', enterprise: 'Unlimited' },
  { name: 'Monthly Conversations', starter: '5,000', pro: '50,000', enterprise: 'Unlimited' },
  { name: 'Web Widget', starter: true, pro: true, enterprise: true },
  { name: 'Multi-Channel', starter: false, pro: true, enterprise: true },
  { name: 'White-Label Branding', starter: false, pro: false, enterprise: true },
  { name: 'Analytics Dashboard', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
  { name: 'Custom Training', starter: false, pro: true, enterprise: true },
  { name: 'A/B Testing', starter: false, pro: true, enterprise: true },
  { name: 'API Access', starter: false, pro: '100k calls/mo', enterprise: 'Unlimited' },
  { name: 'Role-Based Access', starter: false, pro: true, enterprise: true },
  { name: 'Webhooks', starter: false, pro: true, enterprise: true },
  { name: 'On-Premise Deployment', starter: false, pro: false, enterprise: true },
  { name: 'SSO Integration', starter: false, pro: false, enterprise: true },
  { name: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
  { name: 'Custom SLA', starter: false, pro: false, enterprise: true },
];

const faqs = [
  {
    question: 'Can I switch plans at any time?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new pricing takes effect immediately with a prorated charge. When downgrading, the change applies at the start of your next billing cycle so you keep your current features until then.',
  },
  {
    question: 'What happens if I exceed my conversation limit?',
    answer:
      'We will never cut off your users mid-conversation. If you approach your monthly limit, we send alerts at 80% and 95% usage. Beyond the limit, additional conversations are billed at a per-conversation overage rate, which is outlined in your plan details.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Absolutely. Every new account starts with a 14-day free trial of the Pro plan with no credit card required. You get full access to multi-channel deployment, custom training, and analytics so you can evaluate the platform thoroughly before committing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards including Visa, Mastercard, and American Express. Enterprise customers can also pay via wire transfer or ACH with net-30 terms. Annual plans can be invoiced quarterly upon request.',
  },
  {
    question: 'Do you offer discounts for startups or nonprofits?',
    answer:
      'Yes, we offer a 50% discount on the Pro plan for qualifying startups under two years old with less than $5M in funding, as well as for registered nonprofit organizations. Contact our sales team with your details to apply.',
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

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-cyan" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/30" />
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHero
        badge="Pricing"
        title="Simple, Transparent"
        highlight="Pricing"
        description="Choose the plan that fits your needs. Start free, scale as you grow, and only pay for what you use."
      />

      {/* Billing Toggle */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                annual ? 'bg-cyan' : 'bg-secondary/50'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white"
                animate={{ x: annual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {annual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-semibold text-cyan bg-cyan/10 px-2 py-1 rounded-full"
              >
                Save 20%
              </motion.span>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {tiers.map((tier, index) => {
              const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
              const price = tier.monthlyPrice
                ? annual
                  ? Math.round(tier.monthlyPrice * 0.8)
                  : tier.monthlyPrice
                : null;

              return (
                <motion.div
                  ref={ref}
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                    tier.popular
                      ? 'border-cyan/50 bg-card/50 shadow-lg shadow-cyan/10'
                      : 'border-border/50 bg-card/50'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan text-white text-xs font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4">
                      <tier.icon className="w-6 h-6 text-cyan" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">${price}</span>
                        <span className="text-muted-foreground">/ month</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-foreground">Custom</span>
                      </div>
                    )}
                    {annual && price !== null && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed annually at ${price * 12}/year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className={`w-full ${
                      tier.popular
                        ? 'bg-cyan hover:bg-cyan/90 text-white'
                        : 'bg-secondary/50 hover:bg-secondary text-foreground'
                    }`}
                  >
                    <Link to={tier.ctaLink}>
                      {tier.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Detailed <span className="gradient-text">Feature Comparison</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare every feature across all plans to find the right fit for your organization.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="overflow-x-auto rounded-2xl border border-border/50">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-secondary/50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Starter</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-cyan">Pro</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((row, index) => (
                    <tr key={row.name} className={`border-b border-border/50 ${index % 2 === 0 ? 'bg-card/50' : ''}`}>
                      <td className="py-4 px-6 text-sm font-medium text-foreground">{row.name}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center">
                          <FeatureCell value={row.starter} />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center">
                          <FeatureCell value={row.pro} />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center">
                          <FeatureCell value={row.enterprise} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
              const isOpen = openFaq === index;
              return (
                <motion.div
                  ref={ref}
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-xl border border-border/50 bg-card/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-foreground">{faq.question}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="p-12 rounded-3xl bg-card/50 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-cyan/5" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Need a <span className="gradient-text">Custom Solution</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our Enterprise plan is tailored to your exact requirements with dedicated support, custom SLAs, and flexible deployment options.
                </p>
                <Button asChild size="lg" className="bg-cyan hover:bg-cyan/90 text-white">
                  <Link to="/contact">
                    Contact Sales <ArrowRight className="w-4 h-4 ml-2" />
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
