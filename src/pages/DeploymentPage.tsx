import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Cloud,
  Server,
  CheckCircle,
  Shield,
  Lock,
  FileCheck,
  Globe,
  ArrowRight,
  Database,
  Monitor,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import PageHero from '@/components/layout/PageHero';

const cloudFeatures = [
  'Instant provisioning in under 5 minutes',
  'Auto-scaling from 0 to millions of requests',
  'Multi-region deployment across 12 global zones',
  'Managed updates and zero-downtime patches',
  'Built-in CDN for edge-optimized latency',
  '99.99% uptime SLA with automated failover',
  'Pay-as-you-go pricing with no upfront costs',
  'Integrated monitoring and alerting dashboards',
];

const onPremFeatures = [
  'Full data sovereignty within your firewall',
  'Air-gapped deployment for classified environments',
  'Custom hardware acceleration (GPU / TPU support)',
  'Integration with existing Active Directory / LDAP',
  'On-site installation by certified engineers',
  'Dedicated support with 4-hour response SLA',
  'One-time license with optional maintenance plan',
  'Complete audit trail and access control logs',
];

const complianceCerts = [
  {
    id: 'soc2',
    title: 'SOC 2 Type II',
    icon: Shield,
    description:
      'Independently audited controls for security, availability, processing integrity, confidentiality, and privacy. Our SOC 2 report is available under NDA for enterprise evaluations.',
  },
  {
    id: 'gdpr',
    title: 'GDPR Compliant',
    icon: Globe,
    description:
      'Full compliance with the EU General Data Protection Regulation. We support data subject access requests, right to erasure, data portability, and maintain detailed processing records.',
  },
  {
    id: 'hipaa',
    title: 'HIPAA Ready',
    icon: Lock,
    description:
      'Business Associate Agreement available for healthcare organizations. PHI is encrypted at rest with AES-256 and in transit with TLS 1.3. Access is audited and time-limited.',
  },
  {
    id: 'iso',
    title: 'ISO 27001',
    icon: FileCheck,
    description:
      'Certified information security management system covering risk assessment, access control, incident management, and continuous improvement processes across all operations.',
  },
];

const faqItems = [
  {
    id: 'faq-1',
    question: 'How long does a typical cloud deployment take?',
    answer:
      'Most cloud deployments are live within 5 to 15 minutes. After selecting your agent type and configuring basic settings, our automated provisioning pipeline handles infrastructure setup, model loading, and health checks. You receive a live endpoint URL and API key immediately upon completion.',
  },
  {
    id: 'faq-2',
    question: 'Can I migrate from cloud to on-premise later?',
    answer:
      'Absolutely. We designed our platform with portability in mind. Your agent configurations, trained models, knowledge bases, and conversation history can all be exported and migrated to an on-premise installation. Our migration team assists with the transition to ensure zero data loss and minimal downtime.',
  },
  {
    id: 'faq-3',
    question: 'What are the hardware requirements for on-premise deployment?',
    answer:
      'Minimum requirements are 16 GB RAM, 4 CPU cores, and 100 GB SSD storage for a single-agent setup. For production workloads, we recommend 64 GB RAM, 16 cores, and GPU acceleration (NVIDIA A10 or better) for optimal inference speed. We provide detailed sizing guides based on your expected throughput.',
  },
  {
    id: 'faq-4',
    question: 'How does auto-scaling work in the cloud deployment?',
    answer:
      'Our cloud infrastructure uses predictive and reactive scaling. The system monitors request patterns, queue depth, and response latency in real time. When thresholds are approached, new inference instances spin up within 30 seconds. During quiet periods, resources scale down to minimize costs. You can also set hard limits on maximum scale.',
  },
  {
    id: 'faq-5',
    question: 'Is a hybrid deployment model supported?',
    answer:
      'Yes. Many enterprise clients run sensitive operations on-premise while leveraging our cloud infrastructure for customer-facing agents. The hybrid model uses encrypted tunnels between environments, unified monitoring, and a single management console. Data classification rules determine which conversations stay on-premise versus cloud.',
  },
];

export default function DeploymentPage() {
  const [compRef, compInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [archRef, archInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [secRef, secInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Deployment"
        title="Deploy Your Way,"
        highlight="Your Terms"
        description="Whether you need the speed of the cloud or the control of on-premise infrastructure, WebCraft AI adapts to your requirements with enterprise-grade reliability."
      />

      {/* Cloud vs On-Premise Comparison */}
      <section ref={compRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={compInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Infrastructure</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Both deployment options deliver the same powerful AI capabilities. Pick the model that aligns with your security, compliance, and operational needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cloud Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={compInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-cyan/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center">
                  <Cloud className="w-7 h-7 text-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Cloud Deployment</h3>
                  <p className="text-sm text-muted-foreground">Fully managed infrastructure</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-xs text-cyan font-medium mb-6">
                Most Popular
              </div>
              <ul className="space-y-3">
                {cloudFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild size="lg" className="w-full bg-cyan text-black hover:bg-cyan/90 font-semibold">
                  <Link to="/deploy">Start Cloud Deployment</Link>
                </Button>
              </div>
            </motion.div>

            {/* On-Premise Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={compInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-purple/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-purple/10 flex items-center justify-center">
                  <Server className="w-7 h-7 text-purple" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">On-Premise</h3>
                  <p className="text-sm text-muted-foreground">Complete data control</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-xs text-purple font-medium mb-6">
                Enterprise
              </div>
              <ul className="space-y-3">
                {onPremFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild variant="outline" size="lg" className="w-full border-purple/30 hover:bg-purple/10 hover:border-purple/50">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section ref={archRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              System <span className="gradient-text">Architecture</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A high-level overview of how requests flow through our infrastructure, from client to response.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={archInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/50 border border-border/50 rounded-2xl p-8 sm:p-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {/* Client */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={archInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-2xl bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                  <Monitor className="w-10 h-10 text-cyan" />
                </div>
                <span className="text-sm font-semibold text-foreground">Client</span>
                <span className="text-xs text-muted-foreground text-center">Web, Mobile,<br />API</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={archInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="hidden md:flex items-center"
              >
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan to-purple" />
                <ArrowRight className="w-5 h-5 text-purple -ml-1" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={archInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="md:hidden"
              >
                <div className="w-0.5 h-8 bg-gradient-to-b from-cyan to-purple mx-auto" />
              </motion.div>

              {/* Load Balancer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={archInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-2xl bg-purple/10 border border-purple/30 flex items-center justify-center">
                  <Globe className="w-10 h-10 text-purple" />
                </div>
                <span className="text-sm font-semibold text-foreground">Load Balancer</span>
                <span className="text-xs text-muted-foreground text-center">TLS Termination,<br />Rate Limiting</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={archInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="hidden md:flex items-center"
              >
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple to-cyan" />
                <ArrowRight className="w-5 h-5 text-cyan -ml-1" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={archInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="md:hidden"
              >
                <div className="w-0.5 h-8 bg-gradient-to-b from-purple to-cyan mx-auto" />
              </motion.div>

              {/* AI Engine */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={archInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-2xl bg-cyan/10 border border-cyan/30 flex items-center justify-center shadow-glow">
                  <Cpu className="w-10 h-10 text-cyan" />
                </div>
                <span className="text-sm font-semibold text-foreground">AI Engine</span>
                <span className="text-xs text-muted-foreground text-center">Inference,<br />NLU Pipeline</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={archInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="hidden md:flex items-center"
              >
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan to-purple" />
                <ArrowRight className="w-5 h-5 text-purple -ml-1" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={archInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="md:hidden"
              >
                <div className="w-0.5 h-8 bg-gradient-to-b from-cyan to-purple mx-auto" />
              </motion.div>

              {/* Database */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={archInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-2xl bg-purple/10 border border-purple/30 flex items-center justify-center">
                  <Database className="w-10 h-10 text-purple" />
                </div>
                <span className="text-sm font-semibold text-foreground">Database</span>
                <span className="text-xs text-muted-foreground text-center">Knowledge Base,<br />Vector Store</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section ref={secRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={secInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Security & <span className="gradient-text">Compliance</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We meet the most rigorous security standards so you can deploy with confidence across regulated industries.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceCerts.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={secInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card/50 border border-border/50 rounded-2xl p-6 hover:border-cyan/30 transition-all duration-300 hover:shadow-glow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Deployment <span className="gradient-text">FAQ</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Common questions about getting your AI agents up and running.
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Start Deploying <span className="gradient-text">Today</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Cloud deployments go live in minutes. On-premise installations are completed within days. Either way, your AI agents are ready to work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan text-black hover:bg-cyan/90 font-semibold px-8">
                <Link to="/deploy">
                  Launch Deployment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/50 hover:border-purple/30">
                <Link to="/contact">Schedule a Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
