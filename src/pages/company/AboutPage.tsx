import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Lightbulb, Shield, Heart, Users, ArrowRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const milestones = [
  { year: '2021', title: 'Founded', description: 'WebCraft AI was born from a vision to make intelligent automation accessible to every business, regardless of size or technical expertise.' },
  { year: '2022', title: 'First 100 Customers', description: 'Reached our first major milestone by onboarding 100 businesses across industries including e-commerce, healthcare, and fintech.' },
  { year: '2023', title: 'Series A Funding', description: 'Secured $25M in Series A funding to expand our platform capabilities, grow our engineering team, and invest in cutting-edge AI research.' },
  { year: '2024', title: 'Global Expansion', description: 'Opened offices in London, Singapore, and Sydney while launching multi-language support for over 40 languages worldwide.' },
  { year: '2025', title: '1M+ Agents Deployed', description: 'Surpassed one million AI agents deployed globally, processing billions of interactions and saving businesses thousands of hours daily.' },
];

const values = [
  { icon: Lightbulb, title: 'Innovation', description: 'We push the boundaries of what AI can achieve, constantly exploring new approaches to solve complex business challenges with elegant solutions.', color: 'cyan' },
  { icon: Shield, title: 'Trust', description: 'Security, transparency, and reliability are non-negotiable. We build systems our customers can depend on and earn their confidence every day.', color: 'purple' },
  { icon: Heart, title: 'Customer First', description: 'Every decision we make starts with the customer. We listen deeply, respond quickly, and measure our success by the outcomes we deliver for them.', color: 'cyan' },
  { icon: Users, title: 'Open Collaboration', description: 'Great ideas emerge from diverse perspectives. We foster a culture of openness, knowledge sharing, and cross-functional teamwork across every level.', color: 'purple' },
];

const team = [
  { name: 'Sarah Chen', role: 'CEO & Co-Founder', initials: 'SC', color: 'bg-cyan/20 text-cyan' },
  { name: 'Marcus Rivera', role: 'CTO & Co-Founder', initials: 'MR', color: 'bg-purple/20 text-purple' },
  { name: 'Aisha Patel', role: 'VP of Engineering', initials: 'AP', color: 'bg-cyan/20 text-cyan' },
  { name: 'David Kim', role: 'Head of AI Research', initials: 'DK', color: 'bg-purple/20 text-purple' },
  { name: 'Elena Volkov', role: 'VP of Product', initials: 'EV', color: 'bg-cyan/20 text-cyan' },
  { name: 'James Okafor', role: 'Head of Customer Success', initials: 'JO', color: 'bg-purple/20 text-purple' },
];

export default function AboutPage() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="About Us"
        title="Building the Future of"
        highlight="AI Automation"
        description="We are a team of engineers, designers, and AI researchers united by a single mission: to empower businesses with intelligent automation that works seamlessly, scales effortlessly, and delivers measurable results."
      />

      {/* Mission Statement */}
      <section ref={missionRef} className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan via-purple to-transparent rounded-full" />
            <div className="pl-8">
              <p className="text-sm font-semibold text-cyan uppercase tracking-wider mb-4">Our Mission</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-relaxed">
                We believe that every business deserves access to the{' '}
                <span className="gradient-text">transformative power of artificial intelligence</span>. Our platform
                removes complexity, reduces cost, and puts intelligent automation within reach of teams everywhere —
                from ambitious startups to global enterprises.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small founding team with a bold idea to a global platform powering millions of AI agents — here is how we got here.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-purple to-transparent" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 sm:mb-16 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan border-4 border-background z-10 shadow-[0_0_12px_rgba(0,200,255,0.4)]" />

                {/* Content */}
                <div className={`ml-14 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <span className="inline-block text-sm font-bold text-cyan mb-2">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every product decision, every customer interaction, and every line of code we write.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  value.color === 'cyan' ? 'bg-cyan/10' : 'bg-purple/10'
                }`}>
                  <value.icon className={`w-7 h-7 ${value.color === 'cyan' ? 'text-cyan' : 'text-purple'}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our leadership team brings decades of combined experience in AI, engineering, product development, and customer success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300 text-center"
              >
                <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center mx-auto mb-5 text-2xl font-bold`}>
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl font-bold mb-4">
              Want to Be Part of the <span className="gradient-text">Journey</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We are always looking for talented, passionate people who want to shape the future of AI automation. Explore our open positions and find your place on the team.
            </p>
            <Link to="/careers">
              <Button className="bg-cyan hover:bg-cyan/90 text-background font-semibold px-8 py-3 rounded-xl">
                View Open Positions <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
