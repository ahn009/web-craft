import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

// Dynamic import for 3D component to avoid SSR issues
const BrainSphere = () => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  
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
  { icon: Zap, value: '10x', label: 'Faster Deployment' },
  { icon: Shield, value: '99.9%', label: 'Uptime SLA' },
  { icon: Globe, value: '50+', label: 'Countries' },
];

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                Next-Gen AI Agents
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Build{' '}
              <span className="gradient-text-animated">Intelligent</span>
              <br />
              AI Agents That
              <br />
              <span className="relative">
                Transform
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
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
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Deploy powerful AI agents for customer support, sales, analytics, and more. 
              Cloud or on-premise, scaled to your needs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link to="/deploy">
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold px-8 py-6 rounded-full group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Deploy Your Agent
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan/30 text-foreground hover:bg-cyan/10 hover:border-cyan/50 px-8 py-6 rounded-full group"
                >
                  <Play className="w-5 h-5 mr-2 text-cyan" />
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
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
            className="relative h-[400px] lg:h-[600px]"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-cyan/20 blur-3xl animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-purple/20 blur-2xl animate-pulse delay-500" />
            </div>
            
            {/* 3D Component */}
            <div className="relative z-10 w-full h-full">
              <BrainSphere />
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-10 right-10 px-4 py-2 rounded-full bg-navy-900/80 backdrop-blur-sm border border-cyan/20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm text-cyan">AI Powered</span>
            </motion.div>
            
            <motion.div
              className="absolute bottom-20 left-10 px-4 py-2 rounded-full bg-navy-900/80 backdrop-blur-sm border border-purple/20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm text-purple">24/7 Active</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
