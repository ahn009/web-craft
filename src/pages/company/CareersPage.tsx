import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Globe,
  BookOpen,
  Rocket,
  Heart,
  ChevronDown,
  MapPin,
  Briefcase,
  Stethoscope,
  TrendingUp,
  Calendar,
  GraduationCap,
  Home,
  Plane,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const cultureCards = [
  {
    icon: Globe,
    title: 'Remote-First',
    description: 'Work from anywhere in the world. Our distributed team spans 15 countries, and we have built tools and rituals that make remote collaboration seamless and productive.',
    color: 'cyan',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: 'Every team member gets a dedicated learning budget plus weekly knowledge-sharing sessions. We invest in your growth because your expertise drives our innovation.',
    color: 'purple',
  },
  {
    icon: Rocket,
    title: 'Impact-Driven',
    description: 'Your work directly shapes how thousands of businesses use AI. We ship fast, measure outcomes, and celebrate the real-world impact our products create.',
    color: 'cyan',
  },
  {
    icon: Heart,
    title: 'Diverse & Inclusive',
    description: 'We actively build a team that reflects the diversity of our global customer base. Different backgrounds and perspectives make our products and culture stronger.',
    color: 'purple',
  },
];

const positions = [
  {
    title: 'Senior AI Engineer',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Design, build, and optimize the core AI models and inference pipelines that power our agent platform. You will work at the intersection of applied research and production engineering.',
    requirements: [
      '5+ years of experience in machine learning or AI engineering',
      'Strong proficiency in Python, PyTorch, and transformer architectures',
      'Experience deploying and monitoring ML models in production at scale',
      'Familiarity with LLM fine-tuning, RAG systems, and agent frameworks',
      'Excellent communication skills and a collaborative mindset',
    ],
  },
  {
    title: 'Full-Stack Developer',
    location: 'Remote (US / EU)',
    type: 'Full-time',
    description: 'Build the web applications and internal tools that our customers and team rely on daily. You will own features end-to-end, from database schema to pixel-perfect UI.',
    requirements: [
      '3+ years of full-stack development experience',
      'Proficiency in TypeScript, React, and Node.js',
      'Experience with relational databases (PostgreSQL) and REST/GraphQL APIs',
      'Familiarity with cloud platforms (AWS, GCP, or Azure)',
      'Eye for design and strong attention to user experience',
    ],
  },
  {
    title: 'Product Designer',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Shape the user experience of our AI agent platform from concept to launch. You will conduct research, create wireframes and prototypes, and collaborate closely with engineering.',
    requirements: [
      '4+ years of product design experience for SaaS or developer tools',
      'Expertise in Figma and modern design systems',
      'Strong portfolio demonstrating user-centered design thinking',
      'Experience conducting user research and usability testing',
      'Ability to translate complex technical concepts into intuitive interfaces',
    ],
  },
  {
    title: 'DevOps Engineer',
    location: 'Remote (US / EU)',
    type: 'Full-time',
    description: 'Architect and maintain the infrastructure that keeps our platform fast, reliable, and secure. You will build CI/CD pipelines, manage Kubernetes clusters, and drive our observability strategy.',
    requirements: [
      '4+ years of DevOps or SRE experience',
      'Strong expertise in Kubernetes, Docker, and Terraform',
      'Experience with AWS or GCP infrastructure management',
      'Proficiency in monitoring tools (Prometheus, Grafana, Datadog)',
      'Understanding of security best practices and compliance frameworks',
    ],
  },
  {
    title: 'AI Research Scientist',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Push the boundaries of what our AI agents can do through novel research in areas such as multi-agent coordination, tool use, long-horizon planning, and safety alignment.',
    requirements: [
      'PhD or equivalent experience in ML, NLP, or a related field',
      'Track record of publications at top venues (NeurIPS, ICML, ACL, etc.)',
      'Deep understanding of language models, reinforcement learning, or agent architectures',
      'Ability to bridge fundamental research and practical product applications',
      'Strong programming skills in Python and deep learning frameworks',
    ],
  },
  {
    title: 'Customer Success Manager',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Be the trusted advisor for our enterprise customers, helping them onboard, adopt, and maximize the value of WebCraft AI agents across their organizations.',
    requirements: [
      '3+ years of customer success or account management experience in B2B SaaS',
      'Strong communication and relationship-building skills',
      'Technical aptitude — comfortable discussing APIs, integrations, and workflows',
      'Experience with CRM tools (Salesforce, HubSpot) and success platforms',
      'Proven ability to manage renewals, expansions, and reduce churn',
    ],
  },
];

const benefits = [
  { icon: Stethoscope, title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage for you and your dependents from day one.', color: 'cyan' },
  { icon: TrendingUp, title: 'Equity', description: 'Meaningful stock options so you share in the success you help build. Early employees receive generous grants.', color: 'purple' },
  { icon: Calendar, title: 'Unlimited PTO', description: 'Take the time you need to recharge. We encourage a minimum of 4 weeks per year and respect your boundaries.', color: 'cyan' },
  { icon: GraduationCap, title: 'Learning Budget', description: '$2,500 annual stipend for courses, conferences, books, and certifications to invest in your professional growth.', color: 'purple' },
  { icon: Home, title: 'Home Office Setup', description: '$1,500 one-time stipend plus $100/month to create a comfortable, productive workspace wherever you are.', color: 'cyan' },
  { icon: Plane, title: 'Team Retreats', description: 'Two annual all-company retreats in inspiring locations to connect, collaborate, and celebrate together in person.', color: 'purple' },
];

export default function CareersPage() {
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null);
  const [cultureRef, cultureInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [positionsRef, positionsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Careers"
        title="Join Our"
        highlight="Mission"
        description="Help us build the AI automation platform that empowers businesses worldwide. We are looking for talented people who thrive on solving hard problems and making a real impact."
      />

      {/* Culture */}
      <section ref={cultureRef} className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cultureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Culture</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have intentionally built a culture that attracts great people and helps them do the best work of their careers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cultureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  card.color === 'cyan' ? 'bg-cyan/10' : 'bg-purple/10'
                }`}>
                  <card.icon className={`w-7 h-7 ${card.color === 'cyan' ? 'text-cyan' : 'text-purple'}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section ref={positionsRef} className="relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Open <span className="gradient-text">Positions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are hiring across engineering, design, research, and customer-facing roles. Find the one that fits your skills and ambitions.
            </p>
          </motion.div>

          <div className="space-y-4">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={positionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl bg-card/50 border border-border/50 overflow-hidden hover:border-cyan/30 transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedPosition(expandedPosition === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{position.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      expandedPosition === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedPosition === index ? 'auto' : 0,
                    opacity: expandedPosition === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-border/50 pt-4">
                    <p className="text-muted-foreground leading-relaxed mb-4">{position.description}</p>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Requirements</h4>
                    <ul className="space-y-2 mb-6">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Button className="bg-cyan hover:bg-cyan/90 text-background font-semibold px-6 py-2.5 rounded-xl">
                      Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Perks & <span className="gradient-text">Benefits</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take care of our team so they can focus on doing their best work. Here is what you can expect when you join.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  benefit.color === 'cyan' ? 'bg-cyan/10' : 'bg-purple/10'
                }`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color === 'cyan' ? 'text-cyan' : 'text-purple'}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
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
              Don't See Your <span className="gradient-text">Role</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We are always interested in hearing from exceptional people. Reach out and tell us how you can contribute to our mission.
            </p>
            <Link to="/contact">
              <Button className="bg-cyan hover:bg-cyan/90 text-background font-semibold px-8 py-3 rounded-xl">
                Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
