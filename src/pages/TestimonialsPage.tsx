import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/lib/agents';
import PageHero from '@/components/layout/PageHero';

const caseStudies = [
  {
    company: 'Meridian Financial Group',
    industry: 'Banking & Finance',
    metric: '73% reduction in average handling time',
    story:
      'Meridian deployed our Support Agent to handle tier-one customer inquiries across their retail banking division. Within 60 days, the AI agent was resolving account balance queries, transaction disputes, and card activation requests without human intervention. Their contact center team shifted focus to complex advisory services, driving a 28% increase in cross-sell revenue alongside the efficiency gains.',
  },
  {
    company: 'Veridia Health',
    industry: 'Healthcare',
    metric: '4.8/5 patient satisfaction score',
    story:
      'Patient appointment scheduling was consuming 40% of front-desk staff time at Veridia Health clinics. After deploying a WhatsApp Agent integrated with their EHR system, patients could book, reschedule, and receive pre-visit instructions through conversational AI. No-show rates dropped by 35% thanks to automated reminders, and staff reallocated 120+ hours per month to direct patient care.',
  },
  {
    company: 'NexGen Logistics',
    industry: 'Supply Chain & Logistics',
    metric: '$1.2M annual cost savings',
    story:
      'NexGen operated a 24/7 dispatch coordination center with 45 agents handling shipment tracking inquiries. Our Analytics Agent combined with a Support Agent now handles 82% of inbound tracking requests, provides proactive delay notifications, and routes complex issues to specialists. The result: fewer agents needed on night shifts, faster response times, and significant annual operational savings.',
  },
];

const companyLogos = [
  'TechFlow Inc.',
  'GrowthLabs',
  'GlobalServe',
  'StartupX',
  'Meridian Financial',
  'Veridia Health',
  'NexGen Logistics',
  'CloudPeak Systems',
];

export default function TestimonialsPage() {
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [caseRef, caseInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [logosRef, logosInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Testimonials"
        title="Trusted by"
        highlight="Industry Leaders"
        description="Hear directly from the companies using WebCraft AI to automate their customer interactions, boost efficiency, and drive measurable business outcomes."
      />

      {/* Testimonials Grid */}
      <section ref={gridRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Our Clients <span className="gradient-text">Say</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real feedback from real teams who have transformed their operations with our AI agents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-cyan/30 transition-all duration-300 hover:shadow-glow h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-cyan/30" />
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote Content */}
                  <blockquote className="text-lg text-foreground leading-relaxed mb-8 flex-1">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan/20 to-purple/20 flex items-center justify-center">
                      <span className="text-lg font-bold gradient-text">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section ref={caseRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={caseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              In-Depth <span className="gradient-text">Case Studies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Detailed stories of how organizations across industries achieved transformational results with WebCraft AI.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 30 }}
                animate={caseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-purple/30 transition-all duration-300 hover:shadow-glow h-full flex flex-col">
                  {/* Industry Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-xs text-purple font-medium mb-5 w-fit">
                    {study.industry}
                  </div>

                  {/* Company Name */}
                  <h3 className="text-xl font-bold text-foreground mb-4">{study.company}</h3>

                  {/* Key Metric */}
                  <div className="flex items-center gap-3 bg-cyan/10 border border-cyan/20 rounded-xl p-4 mb-6">
                    <TrendingUp className="w-6 h-6 text-cyan flex-shrink-0" />
                    <span className="text-sm font-semibold text-cyan">{study.metric}</span>
                  </div>

                  {/* Story */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {study.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section ref={logosRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={logosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by <span className="gradient-text">Leading Companies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From fast-growing startups to established enterprises, organizations across the globe rely on WebCraft AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={logosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {companyLogos.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={logosInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="bg-card/50 border border-border/50 rounded-xl p-6 flex items-center justify-center hover:border-cyan/30 transition-all duration-300 group"
              >
                <span className="text-lg font-bold text-muted-foreground group-hover:gradient-text transition-all duration-300">
                  {company}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join the Companies <span className="gradient-text">Leading with AI</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Start your transformation today. Our team is ready to help you achieve the same results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan text-black hover:bg-cyan/90 font-semibold px-8">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/50 hover:border-purple/30">
                <Link to="/deploy">Try It Yourself</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
