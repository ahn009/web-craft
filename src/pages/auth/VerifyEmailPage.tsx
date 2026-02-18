import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { verifyEmail, resendVerification } from '@/services/api';

export default function VerifyEmailPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus('success');
        setMessage('Your email has been verified successfully!');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.message || 'Verification failed');
      });
  }, [token]);

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    setResendStatus('');
    try {
      await resendVerification(resendEmail);
      setResendStatus('Verification email sent! Check your inbox.');
    } catch (err: any) {
      setResendStatus(err.message || 'Failed to resend');
    }
  }

  return (
    <section ref={ref} className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />

      <div className="relative max-w-md mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm"
        >
          {status === 'loading' && (
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-cyan animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
              <p className="text-muted-foreground">Please wait a moment</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Email verified!</h1>
              <p className="text-muted-foreground mb-6">{message}</p>
              <Link to="/login?verified=true">
                <Button className="bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold px-8 py-3 rounded-full hover:shadow-glow transition-all duration-300">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-7 h-7 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Verification failed</h1>
              <p className="text-muted-foreground mb-6">{message}</p>

              <div className="border-t border-border/50 pt-6 mt-6">
                <p className="text-sm text-muted-foreground mb-4">Need a new verification link?</p>
                <form onSubmit={handleResend} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      className="pl-10 bg-background/50 border-border/50 focus:border-cyan/50"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full rounded-full border-border/50 hover:border-cyan/30"
                  >
                    Resend Verification Email
                  </Button>
                </form>
                {resendStatus && (
                  <p className="text-sm text-cyan mt-3">{resendStatus}</p>
                )}
              </div>

              <Link to="/login" className="text-sm text-cyan hover:text-cyan-400 font-medium transition-colors mt-4 inline-block">
                Back to login
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
