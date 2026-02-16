import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
  Send,
  BookOpen,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@webcraft.ai',
    description: 'Send us an email and we will respond within 24 hours on business days.',
    color: 'cyan',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'San Francisco, CA',
    description: '100 Market Street, Suite 400, San Francisco, CA 94105, United States.',
    color: 'purple',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'Available Monday through Friday, 9:00 AM to 6:00 PM Pacific Time.',
    color: 'cyan',
  },
];

const faqs = [
  {
    question: 'How quickly can I deploy an AI agent?',
    answer: 'Most customers have their first AI agent up and running within 30 minutes using our pre-built templates. Custom configurations typically take a few hours, and our team is always available to help with onboarding and setup.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, we offer a 14-day free trial with full access to all features, including up to 3 AI agents and 1,000 interactions. No credit card is required to get started.',
  },
  {
    question: 'Can I integrate WebCraft AI with my existing tools?',
    answer: 'Absolutely. We provide native integrations with popular platforms including Slack, Salesforce, HubSpot, Zendesk, Shopify, and many more. Our REST API and webhooks allow you to connect with virtually any system.',
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'All plans include email support with 24-hour response times. Pro and Enterprise plans include live chat, dedicated account managers, and priority phone support. Enterprise customers also receive custom SLAs.',
  },
  {
    question: 'Is my data secure with WebCraft AI?',
    answer: 'Security is our top priority. We are SOC 2 Type II certified, GDPR compliant, and all data is encrypted at rest and in transit. Enterprise customers can opt for dedicated infrastructure and data residency controls.',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Sales & Pricing',
  'Technical Support',
  'Partnership Opportunities',
  'Press & Media',
];

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Contact"
        title="Get in"
        highlight="Touch"
        description="Have a question, want a demo, or ready to get started? We would love to hear from you. Reach out and our team will get back to you promptly."
      />

      {/* Contact Form & Info */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="p-8 sm:p-10 rounded-2xl bg-card/50 border border-border/50"
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we will get back to you within one business day.
                </p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:border-cyan/50 transition-colors appearance-none">
                      <option value="" disabled selected>
                        Select a subject
                      </option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors resize-none"
                    />
                  </div>

                  <Button className="w-full sm:w-auto bg-cyan hover:bg-cyan/90 text-background font-semibold px-8 py-3 rounded-xl">
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Contact Info Cards */}
            <div ref={infoRef} className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={infoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    info.color === 'cyan' ? 'bg-cyan/10' : 'bg-purple/10'
                  }`}>
                    <info.icon className={`w-6 h-6 ${info.color === 'cyan' ? 'text-cyan' : 'text-purple'}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{info.title}</h3>
                  <p className="text-cyan font-medium mb-2">{info.value}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="relative py-20 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to the questions we hear most often. Can't find what you need? Send us a message above.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl bg-card/50 border border-border/50 overflow-hidden hover:border-cyan/30 transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-base font-semibold text-foreground pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === index ? 'auto' : 0,
                    opacity: expandedFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-border/50 pt-4">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section ref={mapRef} className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl bg-card/50 border border-border/50 overflow-hidden h-72 flex items-center justify-center"
          >
            {/* Decorative grid background */}
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple/5 rounded-full blur-3xl" />

            {/* Decorative pin */}
            <div className="relative text-center z-10">
              <div className="w-16 h-16 rounded-full bg-cyan/10 border-2 border-cyan/30 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">San Francisco, CA</h3>
              <p className="text-muted-foreground text-sm">100 Market Street, Suite 400</p>
              <p className="text-muted-foreground text-sm">United States</p>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-cyan/30" />
            <div className="absolute top-20 right-16 w-3 h-3 rounded-full bg-purple/20" />
            <div className="absolute bottom-12 left-1/3 w-2 h-2 rounded-full bg-cyan/20" />
            <div className="absolute bottom-16 right-12 w-2.5 h-2.5 rounded-full bg-purple/30" />
            <div className="absolute top-12 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan/25" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center p-12 rounded-2xl bg-card/50 border border-border/50"
          >
            <div className="w-14 h-14 rounded-xl bg-purple/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-7 h-7 text-purple" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Prefer to <span className="gradient-text">Explore on Your Own</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our comprehensive documentation covers everything from quick-start guides to advanced API references. Dive in and start building.
            </p>
            <Link to="/documentation">
              <Button className="bg-cyan hover:bg-cyan/90 text-background font-semibold px-8 py-3 rounded-xl">
                Browse Documentation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
