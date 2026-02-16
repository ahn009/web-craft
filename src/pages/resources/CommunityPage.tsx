import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  Users,
  Github,
  MessageCircle,
  Heart,
  Eye,
  MessageSquare,
  Calendar,
  Clock,
  MapPin,
  Zap,
} from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const communityStats = [
  { label: 'Members', value: '15K+', icon: Users, color: 'cyan' },
  { label: 'GitHub Stars', value: '5K+', icon: Github, color: 'purple' },
  { label: 'Discord Members', value: '2K+', icon: MessageCircle, color: 'cyan' },
  { label: 'Contributors', value: '500+', icon: Heart, color: 'purple' },
];

const discussionTopics = [
  {
    title: 'Best Practices for WhatsApp Agents',
    category: 'Guides',
    replies: 142,
    views: 3800,
    description:
      'A comprehensive thread covering message formatting, quick reply strategies, session management, and handling multi-language conversations in WhatsApp agents.',
  },
  {
    title: 'Custom Training Tips for Support Agents',
    category: 'Tips',
    replies: 98,
    views: 2400,
    description:
      'Community-curated techniques for fine-tuning support agent responses including training data preparation, feedback loops, and quality scoring methods.',
  },
  {
    title: 'Deployment Strategies for High-Traffic Apps',
    category: 'DevOps',
    replies: 76,
    views: 1900,
    description:
      'Scaling patterns and infrastructure recommendations for deploying agents that handle thousands of concurrent conversations without performance degradation.',
  },
  {
    title: 'Integrating Analytics Agents with BI Tools',
    category: 'Integrations',
    replies: 64,
    views: 1600,
    description:
      'Step-by-step examples of connecting WebCraft analytics agents with Tableau, Power BI, Looker, and custom dashboards for real-time data visualization.',
  },
  {
    title: 'Building Multi-Agent Workflows',
    category: 'Advanced',
    replies: 113,
    views: 3200,
    description:
      'Patterns for chaining multiple agents together to handle complex workflows such as lead qualification to sales handoff to follow-up scheduling.',
  },
  {
    title: 'Security Hardening Your Agent Deployment',
    category: 'Security',
    replies: 55,
    views: 1400,
    description:
      'Community recommendations for securing agent deployments including API key rotation, IP whitelisting, rate limiting, and audit logging configurations.',
  },
];

const topContributors = [
  { name: 'alexchen', initials: 'AC', contributions: 347, color: 'bg-cyan' },
  { name: 'sarahdev', initials: 'SD', contributions: 289, color: 'bg-purple' },
  { name: 'mikerobot', initials: 'MR', contributions: 234, color: 'bg-cyan' },
  { name: 'priyaml', initials: 'PM', contributions: 198, color: 'bg-purple' },
  { name: 'jasonwu', initials: 'JW', contributions: 176, color: 'bg-cyan' },
  { name: 'emmaai', initials: 'EA', contributions: 154, color: 'bg-purple' },
];

const upcomingEvents = [
  {
    type: 'Webinar',
    date: 'March 12, 2026',
    time: '2:00 PM EST',
    title: 'Building Production-Ready AI Agents',
    description:
      'Join our engineering team for a deep dive into production deployment patterns, monitoring strategies, and performance optimization techniques for AI agents at scale.',
    color: 'cyan',
  },
  {
    type: 'Workshop',
    date: 'March 20, 2026',
    time: '10:00 AM EST',
    title: 'Hands-On: Custom Agent Development',
    description:
      'A three-hour interactive workshop where you will build a custom AI agent from scratch, configure its behavior, integrate with external APIs, and deploy to production.',
    color: 'purple',
  },
  {
    type: 'Meetup',
    date: 'April 5, 2026',
    time: '6:00 PM EST',
    title: 'WebCraft AI Community Meetup — NYC',
    description:
      'Connect with fellow WebCraft developers in person. Lightning talks, live demos, networking, and a sneak peek at upcoming platform features and agent capabilities.',
    color: 'cyan',
  },
];

export default function CommunityPage() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [topicsRef, topicsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [contributorsRef, contributorsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [eventsRef, eventsInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        badge="Community"
        title="Join Our Growing"
        highlight="Community"
        description="Connect with thousands of developers, share knowledge, contribute to open-source projects, and help shape the future of AI agent technology together."
      />

      {/* Community Stats */}
      <section ref={statsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500 text-center">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div
                        className={`w-14 h-14 rounded-xl ${
                          stat.color === 'cyan' ? 'bg-cyan/10 border-cyan/20' : 'bg-purple/10 border-purple/20'
                        } border flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className={`w-7 h-7 ${stat.color === 'cyan' ? 'text-cyan' : 'text-purple'}`} />
                      </div>
                      <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discussion Topics */}
      <section ref={topicsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={topicsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <span className="text-sm text-purple font-medium">Discussions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Popular <span className="gradient-text">Topics</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse the most active discussions in our community. Learn from shared experiences,
              ask questions, and contribute your own expertise.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {discussionTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 40 }}
                animate={topicsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-cyan/10 text-cyan border border-cyan/20 mb-4">
                      {topic.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyan transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {topic.replies} replies
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        {topic.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section ref={contributorsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contributorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <span className="text-sm text-cyan font-medium">Top Contributors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Community <span className="gradient-text">Champions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognizing the developers who go above and beyond to help others, contribute code,
              write documentation, and make our community thrive.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topContributors.map((contributor, index) => (
              <motion.div
                key={contributor.name}
                initial={{ opacity: 0, y: 30 }}
                animate={contributorsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-5 rounded-xl border border-border/50 bg-card/50 hover:border-purple/40 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${contributor.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                    >
                      {contributor.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-purple transition-colors truncate">
                        @{contributor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {contributor.contributions} contributions
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section ref={eventsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <Calendar className="w-4 h-4 text-purple" />
              <span className="text-sm text-purple font-medium">Upcoming Events</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Join Us <span className="gradient-text">Live</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Webinars, workshops, and meetups designed to help you get the most out of WebCraft AI.
              Learn directly from our team and connect with fellow developers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                animate={eventsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-cyan/40 hover:shadow-glow transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        event.color === 'cyan'
                          ? 'bg-cyan/10 text-cyan border border-cyan/20'
                          : 'bg-purple/10 text-purple border border-purple/20'
                      } mb-4`}
                    >
                      {event.type}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-cyan transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                      {event.type === 'Meetup' && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          New York City
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="p-10 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5" />
              <div className="relative z-10">
                <Zap className="w-10 h-10 text-cyan mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to <span className="gradient-text">Join</span>?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Become part of a vibrant community of developers building the next generation
                  of AI-powered experiences. Get help, share knowledge, and grow together.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                  >
                    Join the Community
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
