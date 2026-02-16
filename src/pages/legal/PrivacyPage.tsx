import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const tocItems = [
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-information', label: 'How We Use Information' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'contact', label: 'Contact' },
];

export default function PrivacyPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <>
      <PageHero
        badge="Legal"
        title="Privacy"
        highlight="Policy"
        description="Last updated: January 2025"
      />

      <section ref={ref} className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-12"
          >
            {/* Table of Contents Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-cyan" />
                    <h3 className="text-sm font-semibold text-foreground">On This Page</h3>
                  </div>
                  <nav className="space-y-2">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-muted-foreground hover:text-cyan transition-colors duration-200 py-1"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl space-y-12">
              <section id="information-we-collect">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    When you interact with WebCraft AI services, we collect information that you provide directly to us. This includes your name, email address, company name, and billing details when you create an account or subscribe to our services. We also collect information about the AI agents you configure, including workflow settings, integration preferences, and deployment configurations.
                  </p>
                  <p>
                    We automatically collect certain technical information when you visit our website or use our platform. This includes your IP address, browser type and version, operating system, referring URLs, pages viewed, time spent on pages, and other diagnostic data. Our AI agent infrastructure also generates usage logs that track API call volumes, response times, and error rates to ensure service reliability.
                  </p>
                  <p>
                    If you integrate our AI agents with third-party services such as CRM platforms, messaging applications, or analytics tools, we may receive data from those services as necessary to facilitate the integration. The scope of this data depends on the permissions you grant and the specific integration configuration.
                  </p>
                </div>
              </section>

              <section id="how-we-use-information">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Information</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We use the information we collect to provide, maintain, and improve our AI agent services. This includes processing your transactions, managing your account, delivering the AI agents you have deployed, and providing customer support. Your usage data helps us optimize agent performance, identify and resolve technical issues, and develop new features that align with customer needs.
                  </p>
                  <p>
                    We analyze aggregated and anonymized usage patterns to understand how our platform is used, which helps us make informed decisions about product development and infrastructure investments. We may also use your contact information to send you service-related announcements, such as maintenance notifications, security alerts, and updates to our terms or policies.
                  </p>
                  <p>
                    With your consent, we may send you marketing communications about new services, features, or promotions. You can opt out of marketing emails at any time by clicking the unsubscribe link in any marketing message or by updating your notification preferences in your account settings.
                  </p>
                </div>
              </section>

              <section id="data-sharing">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Data Sharing</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We share your information only in the following limited circumstances: with service providers who assist us in operating our platform, such as cloud infrastructure providers, payment processors, and analytics services. These providers are contractually obligated to use your data only for the purposes we specify and in accordance with this privacy policy.
                  </p>
                  <p>
                    We may disclose your information if required by law, regulation, legal process, or governmental request. We may also share information when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others, to investigate fraud, or to respond to a government request.
                  </p>
                  <p>
                    In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email or a prominent notice on our website of any change in ownership or use of your personal information.
                  </p>
                </div>
              </section>

              <section id="data-security">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Security</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All data transmitted between your browser and our servers is encrypted using TLS 1.3 encryption. Data at rest is encrypted using AES-256 encryption across all our storage systems.
                  </p>
                  <p>
                    Our infrastructure is hosted on SOC 2 Type II certified cloud providers with multiple layers of physical and logical security controls. We conduct regular security audits, penetration testing, and vulnerability assessments to identify and address potential security risks. Access to personal data is restricted to authorized employees who need the information to perform their job functions, and all access is logged and monitored.
                  </p>
                  <p>
                    While we strive to protect your personal information, no method of transmission over the Internet or method of electronic storage is completely secure. We cannot guarantee absolute security, but we are committed to promptly addressing any security incidents and notifying affected users in accordance with applicable laws.
                  </p>
                </div>
              </section>

              <section id="your-rights">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Your Rights</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information. These rights may include the right to access the personal data we hold about you, the right to request correction of inaccurate data, the right to request deletion of your data, and the right to data portability. You may also have the right to restrict or object to certain processing activities.
                  </p>
                  <p>
                    If you are located in the European Economic Area, the United Kingdom, or California, you have additional rights under the GDPR, UK GDPR, or CCPA respectively. These include the right to withdraw consent at any time, the right to lodge a complaint with a supervisory authority, and the right not to be subject to automated decision-making. California residents also have the right to know what personal information is collected, disclosed, or sold.
                  </p>
                  <p>
                    To exercise any of these rights, please contact us using the information provided in the Contact section below. We will respond to your request within the timeframes required by applicable law, typically within 30 days. We may need to verify your identity before processing certain requests to protect your account security.
                  </p>
                </div>
              </section>

              <section id="cookies">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Cookies</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We use cookies and similar tracking technologies to collect information about your browsing activities on our website. Essential cookies are necessary for the website to function properly and cannot be disabled. These include session cookies that maintain your login state and preference cookies that remember your settings.
                  </p>
                  <p>
                    Analytics cookies help us understand how visitors interact with our website by collecting information about pages visited, time spent on the site, and any errors encountered. We use this data to improve our website and user experience. Performance cookies help us measure and improve the performance of our platform by tracking load times and response rates.
                  </p>
                  <p>
                    You can control cookies through your browser settings. Most browsers allow you to block or delete cookies, though doing so may affect the functionality of certain features on our website. You can also manage your cookie preferences through our cookie consent banner when you first visit our site. We do not use cookies for third-party advertising purposes.
                  </p>
                </div>
              </section>

              <section id="contact">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact our privacy team at privacy@webcraft-ai.com. You may also reach us by mail at our principal office address listed on our website.
                  </p>
                  <p>
                    For data protection inquiries in the European Economic Area, you may contact our designated Data Protection Officer at dpo@webcraft-ai.com. We are committed to working with you to resolve any complaints or concerns about our privacy practices. If we are unable to resolve your concern, you have the right to lodge a complaint with your local data protection authority.
                  </p>
                  <p>
                    We review and update this privacy policy periodically to reflect changes in our practices, technologies, legal requirements, and other factors. When we make material changes, we will notify you by email or through a prominent notice on our platform prior to the changes taking effect. We encourage you to review this policy regularly to stay informed about how we protect your information.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
