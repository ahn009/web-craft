import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Bot, ShoppingBag, Cpu, Workflow, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

// Dynamic import for 3D component to avoid SSR issues
const BrainSphere = () => {
  const [Component, setComponent] = useState<React.ComponentType<{
    size?: number;
    color?: string;
    wireframe?: boolean;
  }> | null>(null);

  useEffect(() => {
    import('@/components/3d/BrainSphere').then((mod) => {
      setComponent(() => mod.default);
    });
  }, []);

  if (!Component) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan/20 to-purple/20 animate-pulse" />
      </div>
    );
  }

  return <Component size={2.5} color="#00F5FF" wireframe={true} />;
};

const stats = [
  { icon: Bot, value: '1,800+', label: 'AI Agents' },
  { icon: ShoppingBag, value: '10+', label: 'Categories' },
  { icon: Globe, value: '50+', label: 'Countries' },
];

const features = [
  { icon: Cpu, label: 'n8n Workflows' },
  { icon: Workflow, label: 'Ready to Deploy' },
  { icon: Shield, label: 'Enterprise Grade' },
];

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center pt-16 sm:pt-20 pb-8 sm:pb-0 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span className="text-sm text-cyan font-medium">
                AI Agent Marketplace
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6"
            >
              Discover &{' '}
              <span className="gradient-text-animated">Deploy</span>
              <br />
              AI Agents
              <br />
              <span className="relative">
                Instantly
                <motion.svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00F5FF" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8"
            >
              Browse 1,800+ pre-built n8n workflow agents. Purchase, download, and deploy
              automation agents for customer support, sales, analytics, and more.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              {features.map((feat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/50 border border-border/50 text-xs sm:text-sm text-muted-foreground"
                >
                  <feat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-cyan" />
                  <span className="hidden sm:inline">{feat.label}</span>
                  <span className="sm:hidden">{feat.label.split(' ')[0]}</span>
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12"
            >
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold px-6 sm:px-8 py-4 sm:py-6 rounded-full group text-sm sm:text-base"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Browse Marketplace
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>

              <Link to="/services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-cyan/30 text-foreground hover:bg-cyan/10 hover:border-cyan/50 px-6 sm:px-8 py-4 sm:py-6 rounded-full group text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan" />
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - 3D Brain Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[280px] sm:h-[400px] lg:h-[600px] hidden lg:block"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 rounded-full bg-cyan/20 blur-3xl animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 sm:w-48 lg:w-72 h-40 sm:h-48 lg:h-72 rounded-full bg-purple/20 blur-2xl animate-pulse delay-500" />
            </div>

            {/* 3D Component */}
            <div className="relative z-10 w-full h-full">
              <BrainSphere />
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-10 right-10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-navy-900/80 backdrop-blur-sm border border-cyan/20 text-xs sm:text-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-cyan flex items-center gap-2">
                <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">AI Powered</span>
                <span className="sm:hidden">AI</span>
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-20 left-10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-navy-900/80 backdrop-blur-sm border border-purple/20 text-xs sm:text-sm"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-purple flex items-center gap-2">
                <Workflow className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">n8n Ready</span>
                <span className="sm:hidden">n8n</span>
              </span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-navy-900/80 backdrop-blur-sm border border-green-500/20 text-xs sm:text-sm"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="text-green-400 flex items-center gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Secure</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
