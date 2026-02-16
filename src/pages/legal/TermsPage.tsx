import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const tocItems = [
  { id: 'acceptance-of-terms', label: 'Acceptance of Terms' },
  { id: 'use-of-services', label: 'Use of Services' },
  { id: 'user-accounts', label: 'User Accounts' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
];

export default function TermsPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <>
      <PageHero
        badge="Legal"
        title="Terms of"
        highlight="Service"
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
                    <FileText className="w-4 h-4 text-cyan" />
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
              <section id="acceptance-of-terms">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    By accessing or using WebCraft AI services, including our website, AI agent platform, APIs, and any associated tools or documentation (collectively, the "Services"), you agree to be bound by these Terms of Service. If you are using the Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these terms, and references to "you" will include that organization.
                  </p>
                  <p>
                    If you do not agree to these terms, you must not access or use the Services. We reserve the right to modify these terms at any time. We will provide notice of material changes by posting the updated terms on our website and updating the "Last updated" date. Your continued use of the Services after such changes constitutes your acceptance of the revised terms.
                  </p>
                  <p>
                    These terms constitute a legally binding agreement between you and WebCraft AI. They govern your access to and use of all features, functionality, and services provided through our platform. Any additional terms specific to particular services or features will be presented to you when you access those services and are incorporated into these terms by reference.
                  </p>
                </div>
              </section>

              <section id="use-of-services">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Use of Services</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    You may use the Services only for lawful purposes and in accordance with these terms. You agree not to use the Services to transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable. You must not use our AI agents to generate spam, misleading content, or any communications that violate applicable regulations.
                  </p>
                  <p>
                    You are responsible for ensuring that your use of the Services complies with all applicable laws, regulations, and industry standards. This includes data protection regulations such as GDPR, CCPA, and HIPAA where applicable to the data you process through our platform. You must not attempt to reverse engineer, decompile, or disassemble any part of the Services.
                  </p>
                  <p>
                    We reserve the right to set usage limits, rate limits, and storage quotas as described in your service plan. If you exceed these limits, we may throttle your access or require you to upgrade to a higher-tier plan. We may also suspend or restrict access to the Services if we detect activity that threatens the security or performance of our infrastructure.
                  </p>
                </div>
              </section>

              <section id="user-accounts">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    To access certain features of the Services, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other security breach.
                  </p>
                  <p>
                    Each account is intended for use by a single individual or organization. You may not share your account credentials with unauthorized third parties or create multiple accounts to circumvent usage limits or restrictions. Administrator accounts may grant sub-user access within the permissions structure defined by your service plan.
                  </p>
                  <p>
                    We reserve the right to suspend or terminate accounts that violate these terms, remain inactive for extended periods, or are associated with fraudulent or suspicious activity. Upon termination, you will lose access to your account data unless you have exported it prior to termination. We provide data export tools to help you retrieve your information before account closure.
                  </p>
                </div>
              </section>

              <section id="intellectual-property">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Services, including all software, algorithms, models, designs, text, graphics, and other content provided by WebCraft AI, are protected by intellectual property laws and remain the exclusive property of WebCraft AI and its licensors. These terms do not grant you any ownership rights in the Services or our intellectual property.
                  </p>
                  <p>
                    You retain all rights to the data you input into the Services and the outputs generated by your configured AI agents. We do not claim ownership of your content. However, you grant us a limited, non-exclusive license to process, store, and transmit your data as necessary to provide and improve the Services. We will not use your data to train our models without your explicit consent.
                  </p>
                  <p>
                    You may not copy, modify, distribute, sell, or lease any part of the Services without our prior written consent. You may not use our trademarks, logos, or brand assets without authorization. Any feedback, suggestions, or ideas you provide about the Services may be used by us without obligation or compensation to you, and you hereby assign all rights in such feedback to WebCraft AI.
                  </p>
                </div>
              </section>

              <section id="limitation-of-liability">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    To the maximum extent permitted by applicable law, WebCraft AI and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, arising from or related to your use of or inability to use the Services.
                  </p>
                  <p>
                    Our total aggregate liability for any claims arising from or related to these terms or the Services shall not exceed the amount you paid to WebCraft AI during the twelve months preceding the claim. This limitation applies regardless of the legal theory on which the claim is based, whether in contract, tort, strict liability, or otherwise.
                  </p>
                  <p>
                    The Services are provided on an "as is" and "as available" basis without warranties of any kind, whether express, implied, or statutory. We do not warrant that the Services will be uninterrupted, error-free, or free of harmful components. AI-generated outputs may contain inaccuracies, and you are responsible for reviewing and validating all outputs before relying on them for business decisions.
                  </p>
                </div>
              </section>

              <section id="termination">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Termination</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    You may terminate your account at any time by contacting our support team or using the account deletion feature in your dashboard settings. Upon termination, your right to access the Services will immediately cease. We will retain your data for a period of 30 days following termination to allow for data export, after which it will be permanently deleted from our active systems.
                  </p>
                  <p>
                    We may terminate or suspend your access to the Services immediately, without prior notice or liability, if you breach any provision of these terms. We may also terminate your account if required to do so by law, if we discontinue the Services, or if we determine that your use of the Services poses a risk to other users or our infrastructure.
                  </p>
                  <p>
                    Upon termination, all provisions of these terms that by their nature should survive will remain in effect, including but not limited to intellectual property provisions, warranty disclaimers, limitations of liability, and dispute resolution clauses. Any prepaid fees for unused service periods are non-refundable unless otherwise required by applicable law.
                  </p>
                </div>
              </section>

              <section id="governing-law">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Governing Law</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising from or relating to these terms shall be brought exclusively in the federal or state courts located in Wilmington, Delaware.
                  </p>
                  <p>
                    Any dispute arising from these terms or the Services that cannot be resolved through informal negotiation shall be settled by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The arbitration shall be conducted in English, and the arbitrator's decision shall be final and binding. You agree to waive any right to a jury trial or to participate in a class action lawsuit.
                  </p>
                  <p>
                    If any provision of these terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary so that these terms shall otherwise remain in full force and effect. Our failure to enforce any right or provision of these terms shall not constitute a waiver of that right or provision.
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
