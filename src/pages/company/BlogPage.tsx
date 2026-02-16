import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Calendar, Mail } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const categories = ['All', 'Product', 'Engineering', 'AI Research', 'Company News'];

const featuredPost = {
  title: 'The Future of AI Agents in Enterprise',
  excerpt: 'Explore how autonomous AI agents are reshaping enterprise workflows, from customer service to internal operations. We dive into the trends, challenges, and opportunities that lie ahead as businesses adopt intelligent automation at scale.',
  date: 'Jan 15, 2025',
  category: 'AI Research',
  readTime: '12 min read',
};

const blogPosts = [
  {
    title: 'Introducing WebCraft Agent Studio 2.0',
    excerpt: 'Our biggest platform update yet brings a visual workflow builder, real-time debugging, and one-click deployment to help you build smarter agents faster.',
    date: 'Jan 8, 2025',
    category: 'Product',
    readTime: '6 min read',
  },
  {
    title: 'How We Scaled to 1 Million Deployed Agents',
    excerpt: 'A deep dive into the infrastructure decisions, architectural patterns, and engineering culture that enabled us to reach this major milestone.',
    date: 'Dec 22, 2024',
    category: 'Engineering',
    readTime: '10 min read',
  },
  {
    title: 'Fine-Tuning LLMs for Domain-Specific Tasks',
    excerpt: 'Our research team shares findings on adapting large language models for specialized industries including healthcare, legal, and financial services.',
    date: 'Dec 10, 2024',
    category: 'AI Research',
    readTime: '15 min read',
  },
  {
    title: 'WebCraft AI Raises $25M Series A',
    excerpt: 'We are thrilled to announce our Series A funding round led by top-tier investors who share our vision for accessible, intelligent automation.',
    date: 'Nov 28, 2024',
    category: 'Company News',
    readTime: '4 min read',
  },
  {
    title: 'Building Reliable AI Pipelines with Observability',
    excerpt: 'Learn how our engineering team uses distributed tracing, structured logging, and real-time alerting to keep AI agents running smoothly in production.',
    date: 'Nov 15, 2024',
    category: 'Engineering',
    readTime: '8 min read',
  },
  {
    title: 'Customer Spotlight: How RetailCo Cut Response Times by 80%',
    excerpt: 'Discover how one of our enterprise customers transformed their customer support operations using WebCraft AI agents and saw dramatic improvements.',
    date: 'Nov 1, 2024',
    category: 'Product',
    readTime: '7 min read',
  },
];

const categoryColor: Record<string, string> = {
  'Product': 'bg-cyan/10 text-cyan',
  'Engineering': 'bg-purple/10 text-purple',
  'AI Research': 'bg-cyan/10 text-cyan',
  'Company News': 'bg-purple/10 text-purple',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredRef, featuredInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <PageHero
        badge="Blog"
        title="Insights &"
        highlight="Updates"
        description="Stay up to date with the latest in AI automation, product announcements, engineering deep dives, and company news from the WebCraft AI team."
      />

      {/* Category Filter */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-cyan/20 text-cyan border border-cyan/40'
                    : 'bg-card/50 text-muted-foreground border border-border/50 hover:border-cyan/30 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section ref={featuredRef} className="relative py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <a href="#" className="block group">
              <div className="relative p-8 sm:p-12 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300">
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan/10 text-cyan">Featured</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColor[featuredPost.category]} mb-4`}>
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-cyan transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={gridRef} className="relative py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.a
                key={post.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-cyan/30 transition-all duration-300"
              >
                <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-medium ${categoryColor[post.category]} mb-4`}>
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-cyan transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="text-cyan font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No posts found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section ref={ctaRef} className="relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center p-12 rounded-2xl bg-card/50 border border-border/50"
          >
            <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7 text-cyan" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Stay in the <span className="gradient-text">Loop</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest articles, product updates, and AI insights delivered straight to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors"
              />
              <Button className="w-full sm:w-auto bg-cyan hover:bg-cyan/90 text-background font-semibold px-6 py-3 rounded-xl whitespace-nowrap">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
