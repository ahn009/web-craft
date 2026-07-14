import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Server, Plug, CheckCircle } from 'lucide-react';
import { features } from '@/lib/agents';

// Dynamic import for 3D shapes
const GeometricShape = ({ type, color }: { type: 'cube' | 'sphere' | 'torus'; color: string }) => {
  const [Component, setComponent] = useState<React.ComponentType<{
    type: 'cube' | 'sphere' | 'torus';
    color: string;
    size?: number;
    className?: string;
  }> | null>(null);
  
  useEffect(() => {
    import('@/components/3d/GeometricShapes').then((mod) => {
      setComponent(() => mod.GeometricShape);
    });
  }, []);
  
  if (!Component) {
    return (
      <div 
        className="w-32 h-32 rounded-full animate-pulse"
        style={{ backgroundColor: `${color}20` }}
      />
    );
  }
  
  return <Component type={type} color={color} size={1.5} className="w-32 h-32" />;
};

const iconMap: Record<string, typeof Brain> = {
  brain: Brain,
  server: Server,
  plug: Plug,
};

const shapeMap = [
  { type: 'sphere' as const, color: '#00F5FF' },
  { type: 'cube' as const, color: '#8B5CF6' },
  { type: 'torus' as const, color: '#EC4899' },
];

export default function WhyUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="why-us" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6"
            >
              <span className="text-sm text-purple font-medium">Why Choose Us</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              Built for{' '}
              <span className="gradient-text">Performance</span>
              <br />
              & Reliability
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10"
            >
              Our platform is engineered to deliver exceptional results. 
              From intelligent automation to seamless integrations, we have got you covered.
            </motion.p>

            {/* Features List */}
            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || CheckCircle;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                      <Icon className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-cyan transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border/50"
            >
              {[
                { value: '500+', label: 'Enterprise Clients' },
                { value: '10M+', label: 'Conversations' },
                { value: '4.9', label: 'User Rating' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - 3D Shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] hidden lg:block"
          >
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-cyan/10 blur-3xl" />
            </div>
            
            {/* Floating 3D shapes */}
            <div className="relative h-full">
              {shapeMap.map((shape, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${20 + (index * 25)}%`,
                    top: `${15 + (index % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  <GeometricShape type={shape.type} color={shape.color} />
                </motion.div>
              ))}
              
              {/* Connection lines (decorative) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M100 150 Q 200 100 300 200"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.path
                  d="M300 200 Q 400 250 350 350"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 0.8 }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
