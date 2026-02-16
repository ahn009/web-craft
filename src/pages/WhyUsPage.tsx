import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield,
  Zap,
  Globe,
  Brain,
  Clock,
  HeadphonesIcon,
  ArrowRight,
  TrendingUp,
  Users,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import PageHero from '@/components/layout/PageHero';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [counterRef, counterInView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (counterInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [counterInView, target]);

  return <span ref={counterRef}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Companies Served',
    description: 'Enterprise and startup clients trust our AI solutions worldwide',
    icon: Users,
  },
  {
    value: 10,
    suffix: 'M+',
    label: 'Conversations Handled',
    description: 'AI-powered interactions processed seamlessly every month',
    icon: TrendingUp,
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'Uptime Guaranteed',
    description: 'Industry-leading reliability backed by our SLA commitment',
    icon: Shield,
  },
  {
    value: 4.9,
    suffix: '/5',
    label: 'Average Rating',
    description: 'Consistently rated top-tier by our customers on G2 and Capterra',
    icon: Star,
  },
];

const accordionFeatures = [
  {
    id: 'natural-language',
    icon: Brain,
    title: 'Advanced Natural Language Understanding',
    content:
      'Our AI agents leverage state-of-the-art transformer models fine-tuned for business conversations. They understand context, detect sentiment, and respond with human-like precision. Unlike keyword-matching chatbots, our agents grasp nuance, handle multi-turn conversations, and adapt their tone to match your brand voice.',
  },
  {
    id: 'deployment-flex',
    icon: Globe,
    title: 'Flexible Multi-Cloud Deployment',
    content:
      'Choose between fully managed cloud infrastructure, on-premise installation behind your firewall, or a hybrid approach that balances convenience with security. We support AWS, Azure, GCP, and private data centers. Your deployment can scale across regions with automatic failover and load balancing built in.',
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'Sub-Second Response Times',
    content:
      'Performance is non-negotiable. Our inference pipeline is optimized with model quantization, edge caching, and intelligent request routing to deliver responses in under 200 milliseconds on average. Even complex multi-step queries resolve in under a second, keeping your customers engaged and satisfied.',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Enterprise-Grade Security',
    content:
      'SOC 2 Type II certified with end-to-end encryption at rest and in transit. We implement role-based access control, audit logging, and regular penetration testing. Your data never leaves your designated region, and we offer data processing agreements compliant with GDPR, HIPAA, and CCPA regulations.',
  },
  {
    id: 'uptime',
    icon: Clock,
    title: '99.9% Uptime SLA',
    content:
      'Built on redundant infrastructure across multiple availability zones with automated failover. Our monitoring systems detect and remediate issues before they impact your service. In the rare event of downtime, our incident response team is on call 24/7 with a 15-minute initial response time guarantee.',
  },
  {
    id: 'support',
    icon: HeadphonesIcon,
    title: 'Dedicated Customer Success Team',
    content:
      'Every enterprise client is assigned a dedicated customer success manager, a solutions architect, and access to priority support. We conduct quarterly business reviews, proactive optimization recommendations, and hands-on training workshops to ensure you get maximum value from our platform.',
  },
];

const caseStudies = [
  {
    company: 'FinanceFlow Corp',
    industry: 'Financial Services',
    challenge:
      'Manual customer onboarding took 45 minutes per client and led to high dropout rates during the verification process.',
    result:
      'Reduced onboarding time to 8 minutes with AI-guided workflows, cutting dropout rates by 62% and saving $2.3M annually.',
  },
  {
    company: 'HealthBridge Systems',
    industry: 'Healthcare Technology',
    challenge:
      'Patient support lines were overwhelmed with routine inquiries, leading to 20+ minute wait times during peak hours.',
    result:
      'AI agents now handle 78% of inquiries instantly, reducing average wait time to under 2 minutes and improving patient satisfaction scores by 41%.',
  },
  {
    company: 'RetailNova',
    industry: 'E-Commerce',
    challenge:
      'International expansion required multilingual support across 12 markets, but hiring native speakers was cost-prohibitive.',
    result:
      'Deployed multilingual AI agents covering 15 languages, achieving 94% resolution rate and enabling expansion into 8 new markets within 6 months.',
  },
];

export default function WhyUsPage() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [caseRef, caseInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Why Choose Us"
        title="The WebCraft AI"
        highlight="Advantage"
        description="Discover why hundreds of forward-thinking companies choose WebCraft AI to power their customer interactions, automate workflows, and drive measurable business growth."
      />

      {/* Stats Section */}
      <section ref={statsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Numbers That Speak <span className="gradient-text">For Themselves</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our track record of delivering results is reflected in the metrics that matter most to our clients.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-card/50 border border-border/50 rounded-2xl p-8 text-center hover:border-cyan/30 transition-all duration-300 hover:shadow-glow h-full">
                    <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-cyan/20 transition-colors">
                      <Icon className="w-7 h-7 text-cyan" />
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Accordion */}
      <section ref={featuresRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Sets Us <span className="gradient-text">Apart</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the core capabilities and commitments that make WebCraft AI the preferred choice for intelligent automation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {accordionFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <AccordionItem
                    key={feature.id}
                    value={feature.id}
                    className="bg-card/50 border border-border/50 rounded-xl px-6 data-[state=open]:border-cyan/30 transition-colors"
                  >
                    <AccordionTrigger className="text-base font-semibold hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-cyan" />
                        </div>
                        <span>{feature.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pl-14">
                      {feature.content}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section ref={caseRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={caseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real Results from <span className="gradient-text">Real Companies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how organizations across industries are leveraging WebCraft AI to transform their operations and delight their customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 30 }}
                animate={caseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-purple/30 transition-all duration-300 hover:shadow-glow h-full flex flex-col">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-xs text-purple font-medium mb-4 w-fit">
                    {study.industry}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{study.company}</h3>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Challenge</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm font-medium text-cyan mb-1">Result</p>
                    <p className="text-sm text-foreground leading-relaxed">{study.result}</p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm text-cyan hover:text-cyan/80 transition-colors font-medium"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Experience the <span className="gradient-text">Difference</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join 500+ companies already transforming their business with WebCraft AI. Deploy your first agent in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan text-black hover:bg-cyan/90 font-semibold px-8">
                <Link to="/deploy">
                  Deploy Your Agent
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/50 hover:border-cyan/30">
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
