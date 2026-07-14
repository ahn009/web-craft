import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MailCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resendVerification } from '@/services/api';
import { getErrorMessage } from '@/lib/errors';

export default function CheckEmailPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const [resendStatus, setResendStatus] = useState('');
  const [isResending, setIsResending] = useState(false);

  async function handleResend() {
    if (!email) return;
    setResendStatus('');
    setIsResending(true);
    try {
      await resendVerification(email);
      setResendStatus('Verification email sent! Check your inbox.');
    } catch (err: unknown) {
      setResendStatus(getErrorMessage(err, 'Failed to resend'));
    } finally {
      setIsResending(false);
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
          className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm text-center"
        >
          <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-7 h-7 text-cyan" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Check your email</h1>
          <p className="text-muted-foreground mb-2">
            We've sent a verification link to
          </p>
          {email && (
            <p className="text-cyan font-medium mb-6">{email}</p>
          )}
          <p className="text-muted-foreground text-sm mb-8">
            Click the link in the email to verify your account. If you don't see it, check your spam folder.
          </p>

          <div className="space-y-3">
            {email && (
              <Button
                onClick={handleResend}
                disabled={isResending}
                variant="outline"
                className="w-full rounded-full border-border/50 hover:border-cyan/30"
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </Button>
            )}

            {resendStatus && (
              <p className="text-sm text-cyan">{resendStatus}</p>
            )}

            <Link to="/login">
              <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
