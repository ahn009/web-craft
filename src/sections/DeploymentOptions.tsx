import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Server, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamic import for 3D deployment scenes
const DeploymentScene = ({ type }: { type: 'cloud' | 'server' }) => {
  const [Component, setComponent] = useState<React.ComponentType<{
    type: 'cloud' | 'server';
  }> | null>(null);
  
  useEffect(() => {
    import('@/components/3d/DeploymentScenes').then((mod) => {
      setComponent(() => mod.default);
    });
  }, []);
  
  if (!Component) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className="w-32 h-32 rounded-full animate-pulse"
          style={{ backgroundColor: type === 'cloud' ? '#00F5FF20' : '#8B5CF620' }}
        />
      </div>
    );
  }
  
  return <Component type={type} />;
};

const cloudFeatures = [
  'Instant global deployment',
  'Auto-scaling infrastructure',
  '99.99% uptime guarantee',
  'Automatic backups',
  'CDN integration',
  'Real-time monitoring',
];

const localFeatures = [
  'Complete data control',
  'Air-gapped security',
  'Custom compliance',
  'On-premise hosting',
  'Dedicated support',
  'Enterprise SLA',
];

export default function DeploymentOptions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="deployment" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-sm text-cyan font-medium">Deployment</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
          >
            Deploy Your Way with{' '}
            <span className="gradient-text">Flexibility</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Choose the deployment option that fits your security, compliance, and scalability needs.
          </motion.p>
        </div>

        {/* Deployment Cards */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Cloud Deployment */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative"
          >
            <div className="relative h-full rounded-3xl border border-cyan/20 bg-gradient-to-b from-cyan/5 to-transparent p-6 sm:p-8 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-cyan/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-2xl bg-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Cloud className="w-5 sm:w-7 h-5 sm:h-7 text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">Cloud</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Scale instantly worldwide</p>
                  </div>
                </div>

                {/* 3D Scene */}
                <div className="h-32 sm:h-48 mb-4 sm:mb-8">
                  <DeploymentScene type="cloud" />
                </div>

                {/* Features */}
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
                  {cloudFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-cyan" />
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className="w-full bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold py-4 sm:py-6 rounded-xl group/btn text-xs sm:text-base"
                >
                  <span className="flex items-center justify-center gap-2">
                    Deploy to Cloud
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Local/On-Premise */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative"
          >
            <div className="relative h-full rounded-3xl border border-purple/20 bg-gradient-to-b from-purple/5 to-transparent p-6 sm:p-8 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-2xl bg-purple/10 flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 sm:w-7 h-5 sm:h-7 text-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">On-Premise</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Maximum control & security</p>
                  </div>
                </div>

                {/* 3D Scene */}
                <div className="h-32 sm:h-48 mb-4 sm:mb-8">
                  <DeploymentScene type="server" />
                </div>

                {/* Features */}
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
                  {localFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-purple" />
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full border-purple/30 text-foreground hover:bg-purple/10 hover:border-purple/50 py-4 sm:py-6 rounded-xl group/btn text-xs sm:text-base"
                >
                  <span className="flex items-center justify-center gap-2">
                    Contact Sales
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-xs sm:text-base text-muted-foreground mb-3 sm:mb-4">
            Not sure which option is right for you?
          </p>
          <Button variant="link" className="text-cyan hover:text-cyan-400 text-xs sm:text-base">
            Talk to our experts
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
