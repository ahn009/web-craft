import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const ServicesPage = lazy(() => import('@/pages/services/ServicesPage'));
const AgentDetailPage = lazy(() => import('@/pages/services/AgentDetailPage'));
const WhyUsPage = lazy(() => import('@/pages/WhyUsPage'));
const DeploymentPage = lazy(() => import('@/pages/DeploymentPage'));
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'));
const TestimonialsPage = lazy(() => import('@/pages/TestimonialsPage'));
const DeployPage = lazy(() => import('@/pages/DeployPage'));
const FeaturesPage = lazy(() => import('@/pages/product/FeaturesPage'));
const PricingPage = lazy(() => import('@/pages/product/PricingPage'));
const IntegrationsPage = lazy(() => import('@/pages/product/IntegrationsPage'));
const ChangelogPage = lazy(() => import('@/pages/product/ChangelogPage'));
const AboutPage = lazy(() => import('@/pages/company/AboutPage'));
const BlogPage = lazy(() => import('@/pages/company/BlogPage'));
const CareersPage = lazy(() => import('@/pages/company/CareersPage'));
const ContactPage = lazy(() => import('@/pages/company/ContactPage'));
const DocumentationPage = lazy(() => import('@/pages/resources/DocumentationPage'));
const ApiReferencePage = lazy(() => import('@/pages/resources/ApiReferencePage'));
const CommunityPage = lazy(() => import('@/pages/resources/CommunityPage'));
const SupportPage = lazy(() => import('@/pages/resources/SupportPage'));
const PrivacyPage = lazy(() => import('@/pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/legal/TermsPage'));
const SecurityPage = lazy(() => import('@/pages/legal/SecurityPage'));
const MarketplacePage = lazy(() => import('@/pages/MarketplacePage'));
const MarketplaceAgentDetailPage = lazy(() => import('@/pages/MarketplaceAgentDetailPage'));
const MyAgentsPage = lazy(() => import('@/pages/MyAgentsPage'));
const AgentInstanceSetupPage = lazy(() => import('@/pages/AgentInstanceSetupPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Auth pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage'));
const CheckEmailPage = lazy(() => import('@/pages/auth/CheckEmailPage'));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin" />
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><HomePage /></SuspenseWrapper> },
      { path: 'services', element: <SuspenseWrapper><ServicesPage /></SuspenseWrapper> },
      { path: 'services/:slug', element: <SuspenseWrapper><AgentDetailPage /></SuspenseWrapper> },
      { path: 'why-us', element: <SuspenseWrapper><WhyUsPage /></SuspenseWrapper> },
      { path: 'deployment', element: <SuspenseWrapper><DeploymentPage /></SuspenseWrapper> },
      { path: 'how-it-works', element: <SuspenseWrapper><HowItWorksPage /></SuspenseWrapper> },
      { path: 'testimonials', element: <SuspenseWrapper><TestimonialsPage /></SuspenseWrapper> },
      { path: 'deploy', element: <SuspenseWrapper><DeployPage /></SuspenseWrapper> },
      { path: 'features', element: <SuspenseWrapper><FeaturesPage /></SuspenseWrapper> },
      { path: 'pricing', element: <SuspenseWrapper><PricingPage /></SuspenseWrapper> },
      { path: 'integrations', element: <SuspenseWrapper><IntegrationsPage /></SuspenseWrapper> },
      { path: 'changelog', element: <SuspenseWrapper><ChangelogPage /></SuspenseWrapper> },
      { path: 'about', element: <SuspenseWrapper><AboutPage /></SuspenseWrapper> },
      { path: 'blog', element: <SuspenseWrapper><BlogPage /></SuspenseWrapper> },
      { path: 'careers', element: <SuspenseWrapper><CareersPage /></SuspenseWrapper> },
      { path: 'contact', element: <SuspenseWrapper><ContactPage /></SuspenseWrapper> },
      { path: 'documentation', element: <SuspenseWrapper><DocumentationPage /></SuspenseWrapper> },
      { path: 'api-reference', element: <SuspenseWrapper><ApiReferencePage /></SuspenseWrapper> },
      { path: 'community', element: <SuspenseWrapper><CommunityPage /></SuspenseWrapper> },
      { path: 'support', element: <SuspenseWrapper><SupportPage /></SuspenseWrapper> },
      { path: 'privacy', element: <SuspenseWrapper><PrivacyPage /></SuspenseWrapper> },
      { path: 'terms', element: <SuspenseWrapper><TermsPage /></SuspenseWrapper> },
      { path: 'security', element: <SuspenseWrapper><SecurityPage /></SuspenseWrapper> },
      { path: 'marketplace', element: <SuspenseWrapper><MarketplacePage /></SuspenseWrapper> },
      { path: 'marketplace/:id', element: <SuspenseWrapper><MarketplaceAgentDetailPage /></SuspenseWrapper> },
      { path: 'my-agents', element: <SuspenseWrapper><MyAgentsPage /></SuspenseWrapper> },
      { path: 'agent-instances/:id/setup', element: <SuspenseWrapper><AgentInstanceSetupPage /></SuspenseWrapper> },
      // Auth routes
      { path: 'login', element: <SuspenseWrapper><LoginPage /></SuspenseWrapper> },
      { path: 'register', element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper> },
      { path: 'forgot-password', element: <SuspenseWrapper><ForgotPasswordPage /></SuspenseWrapper> },
      { path: 'reset-password', element: <SuspenseWrapper><ResetPasswordPage /></SuspenseWrapper> },
      { path: 'verify-email', element: <SuspenseWrapper><VerifyEmailPage /></SuspenseWrapper> },
      { path: 'check-email', element: <SuspenseWrapper><CheckEmailPage /></SuspenseWrapper> },
      { path: '*', element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper> },
    ],
  },
]);
