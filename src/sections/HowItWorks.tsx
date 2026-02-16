import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { steps } from '@/lib/agents';
import { MousePointer, Settings, Rocket } from 'lucide-react';

const iconMap: Record<number, typeof MousePointer> = {
  1: MousePointer,
  2: Settings,
  3: Rocket,
};

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6"
          >
            <span className="text-sm text-cyan font-medium">How It Works</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            Get Started in{' '}
            <span className="gradient-text">3 Simple Steps</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From setup to deployment in minutes. No complex configuration required.
          </motion.p>
        </div>

        {/* Steps */}
        <div ref={containerRef} className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <svg className="w-full h-8" preserveAspectRatio="none">
              <defs>
                <linearGradient id="stepLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F5FF" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#00F5FF" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 100 4 Q 400 4 700 4"
                stroke="url(#stepLineGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = iconMap[step.number] || MousePointer;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="relative"
                >
                  <div className="text-center">
                    {/* Step Number & Icon */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      {/* Glow */}
                      <div className="absolute inset-0 bg-cyan/20 rounded-full blur-xl" />
                      
                      {/* Circle */}
                      <motion.div
                        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan/20 to-purple/20 border border-cyan/30 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-8 h-8 text-cyan" />
                      </motion.div>
                      
                      {/* Step badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan text-navy-900 font-bold flex items-center justify-center text-sm">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow - Mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-6">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan">
                          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card/50 border border-border/50">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-purple border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">
                Join 500+ companies already using WebCraft AI
              </p>
              <p className="text-xs text-muted-foreground">
                Average setup time: 15 minutes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
