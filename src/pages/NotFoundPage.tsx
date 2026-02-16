import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-purple/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[10rem] sm:text-[14rem] font-black leading-none gradient-text select-none">
            404
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-4 -mt-6"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-muted-foreground max-w-md mx-auto mb-10"
        >
          The page you are looking for does not exist or has been moved. Let us help you find your way back.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <Button
              variant="default"
              size="lg"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-border/50 bg-card/50 text-foreground hover:border-cyan/40 hover:text-cyan transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
