import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield,
  Lock,
  KeyRound,
  ScrollText,
  Search,
  AlertTriangle,
  ArrowRight,
  Mail,
  Clock,
  Award,
  CheckCircle2,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const securityPractices = [
  {
    icon: Lock,
    title: 'Encryption at Rest',
    description:
      'All stored data is encrypted using AES-256 encryption, the same standard used by government agencies and financial institutions. Database records, file uploads, and backup archives are all protected with strong encryption keys managed through a dedicated key management service.',
  },
  {
    icon: Shield,
    title: 'Encryption in Transit',
    description:
      'Every connection to our platform is secured with TLS 1.3, ensuring that data transmitted between your systems and our infrastructure cannot be intercepted or tampered with. We enforce HSTS headers and certificate pinning for all API communications.',
  },
  {
    icon: KeyRound,
    title: 'Access Controls',
    description:
      'We enforce role-based access control across our entire infrastructure. Employee access to production systems requires multi-factor authentication, and permissions follow the principle of least privilege. All access is reviewed quarterly and revoked upon role changes.',
  },
  {
    icon: ScrollText,
    title: 'Audit Logging',
    description:
      'Every action within our platform is recorded in immutable audit logs. This includes API calls, configuration changes, data access events, and administrative actions. Logs are retained for a minimum of 12 months and are available for compliance reporting and forensic analysis.',
  },
  {
    icon: Search,
    title: 'Penetration Testing',
    description:
      'We engage independent third-party security firms to conduct penetration testing on a quarterly basis. These assessments cover our web applications, APIs, infrastructure, and AI model endpoints. Findings are triaged and remediated according to severity within defined SLA windows.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description:
      'Our dedicated security operations team monitors systems around the clock with automated threat detection and alerting. In the event of a security incident, our documented response plan ensures rapid containment, thorough investigation, and transparent communication with affected customers.',
  },
];

const complianceBadges = [
  {
    title: 'SOC 2 Type II',
    description:
      'Our platform has been independently audited and certified for SOC 2 Type II compliance, demonstrating our commitment to security, availability, processing integrity, confidentiality, and privacy controls across all operational processes.',
    icon: Shield,
    color: 'cyan',
  },
  {
    title: 'GDPR',
    description:
      'We are fully compliant with the General Data Protection Regulation, providing EU residents with complete transparency and control over their personal data. We maintain data processing agreements and support all required data subject rights.',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    title: 'HIPAA',
    description:
      'For healthcare customers, we offer HIPAA-compliant deployment configurations with Business Associate Agreements. Our infrastructure meets the administrative, physical, and technical safeguards required for handling protected health information.',
    icon: Award,
    color: 'cyan',
  },
  {
    title: 'ISO 27001',
    description:
      'Our information security management system is certified under ISO 27001, the international standard for managing information security. This certification validates our systematic approach to managing sensitive company and customer information.',
    icon: Lock,
    color: 'purple',
  },
];

export default function SecurityPage() {
  const [practicesRef, practicesInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [complianceRef, complianceInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [reportingRef, reportingInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Security"
        title="Enterprise-Grade"
        highlight="Security"
        description="Your data protection is our highest priority. We implement multiple layers of security controls to safeguard your information at every level of our infrastructure."
      />

      {/* Security Practices */}
      <section ref={practicesRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={practicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <span className="text-sm text-cyan font-medium">Security Practices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built With Security <span className="gradient-text">At Every Layer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From encryption and access controls to continuous monitoring and incident response, our security practices are designed to exceed industry standards.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityPractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <motion.div
                  key={practice.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={practicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-cyan" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-cyan transition-colors">
                        {practice.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {practice.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section ref={complianceRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={complianceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">Compliance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Certified <span className="gradient-text">Compliance</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform meets the most rigorous compliance standards to support regulated industries and enterprise requirements.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {complianceBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={complianceInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/5 via-transparent to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex gap-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                          badge.color === 'cyan'
                            ? 'bg-cyan/10 border-cyan/20'
                            : 'bg-purple/10 border-purple/20'
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 ${
                            badge.color === 'cyan' ? 'text-cyan' : 'text-purple'
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-cyan transition-colors">
                          {badge.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vulnerability Reporting */}
      <section ref={reportingRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reportingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-10 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
                <span className="text-sm text-cyan font-medium">Responsible Disclosure</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Report a <span className="gradient-text">Vulnerability</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We value the security research community and welcome responsible disclosure of potential vulnerabilities in our platform.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <Mail className="w-8 h-8 text-cyan mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-foreground mb-2">Report Via Email</h4>
                <p className="text-xs text-muted-foreground">
                  Send detailed reports to security@webcraft-ai.com with steps to reproduce the issue and any relevant proof-of-concept code.
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <Clock className="w-8 h-8 text-purple mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-foreground mb-2">Response Time</h4>
                <p className="text-xs text-muted-foreground">
                  We acknowledge all reports within 24 hours and provide an initial assessment within 5 business days. Critical issues are triaged immediately.
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-secondary/50 border border-border/50">
                <Award className="w-8 h-8 text-cyan mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-foreground mb-2">Bug Bounty</h4>
                <p className="text-xs text-muted-foreground">
                  Qualifying vulnerability reports are eligible for bounty rewards ranging from $100 to $10,000 depending on severity and impact.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-24 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="p-10 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5" />
              <div className="relative z-10">
                <Shield className="w-10 h-10 text-cyan mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Have Security <span className="gradient-text">Questions</span>?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Our security team is available to discuss your specific compliance requirements, review our security documentation, or schedule a detailed security briefing for your organization.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                  >
                    Contact Security Team
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
