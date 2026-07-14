import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Cloud, Server } from 'lucide-react';
import { agents } from '@/lib/agents';
import type { Agent } from '@/types';

// Dynamic import for 3D icons
const AgentIcon3D = ({ type, color }: { type: Agent['icon']; color: string }) => {
  const [Component, setComponent] = useState<React.ComponentType<{
    type: Agent['icon'];
    color: string;
    size?: string;
  }> | null>(null);
  
  useEffect(() => {
    import('@/components/3d/AgentIcons3D').then((mod) => {
      setComponent(() => mod.default);
    });
  }, []);
  
  if (!Component) {
    return (
      <div 
        className="w-20 h-20 rounded-full animate-pulse"
        style={{ backgroundColor: `${color}30` }}
      />
    );
  }
  
  return <Component type={type} color={color} size="80px" />;
};

interface ServiceCardProps {
  agent: Agent;
  index: number;
}

function ServiceCard({ agent, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div 
        className={`relative h-full p-4 sm:p-6 rounded-2xl border transition-all duration-500 ${
          isHovered 
            ? 'border-cyan/50 bg-navy-900/80 shadow-glow' 
            : 'border-border/50 bg-card/50 hover:border-cyan/30'
        }`}
      >
        {/* Gradient border on hover */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/20 to-purple/20 opacity-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />
        
        <div className="relative z-10">
          {/* 3D Icon */}
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="relative">
              <AgentIcon3D type={agent.icon} color={agent.color} />
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-cyan/20 blur-xl rounded-full"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2 text-center group-hover:text-cyan transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-center line-clamp-2">
            {agent.description}
          </p>

          {/* Features */}
          <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            {agent.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span 
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: agent.color }}
                />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Deployment Options */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            {agent.deployment.includes('cloud') && (
              <span className="flex items-center gap-1 text-xs text-cyan bg-cyan/10 px-2 py-1 rounded-full">
                <Cloud className="w-3 h-3" />
                <span className="hidden sm:inline">Cloud</span>
              </span>
            )}
            {agent.deployment.includes('local') && (
              <span className="flex items-center gap-1 text-xs text-purple bg-purple/10 px-2 py-1 rounded-full">
                <Server className="w-3 h-3" />
                <span className="hidden sm:inline">Local</span>
              </span>
            )}
          </div>

          {/* CTA */}
          <Link to={`/services/${agent.id}`}>
            <motion.div
              className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 rounded-xl bg-secondary/50 text-xs sm:text-sm font-medium text-foreground hover:bg-cyan/10 hover:text-cyan transition-all duration-300 group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-sm text-cyan font-medium">Our Services</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
          >
            AI Agents for{' '}
            <span className="gradient-text">Every Need</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Choose from our pre-built agents or create a custom solution. 
            Each agent is designed to excel in its domain.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {agents.map((agent, index) => (
            <ServiceCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
