import type { Agent, Testimonial, Step, Feature } from '@/types';

export const agents: Agent[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Agent',
    description: 'Automate customer conversations on WhatsApp with intelligent responses and seamless handoffs.',
    icon: 'cube',
    features: [
      '24/7 automated responses',
      'Multi-language support',
      'Order tracking integration',
      'Human handoff capability'
    ],
    color: '#25D366',
    deployment: ['cloud', 'local']
  },
  {
    id: 'support',
    name: 'Support Agent',
    description: 'Intelligent customer support that learns from your knowledge base and resolves issues instantly.',
    icon: 'sphere',
    features: [
      'Knowledge base integration',
      'Ticket auto-routing',
      'Sentiment analysis',
      'Escalation workflows'
    ],
    color: '#00F5FF',
    deployment: ['cloud', 'local']
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    description: 'Convert leads into customers with personalized outreach and intelligent follow-ups.',
    icon: 'torus',
    features: [
      'Lead qualification',
      'Personalized outreach',
      'CRM integration',
      'Pipeline analytics'
    ],
    color: '#8B5CF6',
    deployment: ['cloud']
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    description: 'Transform data into actionable insights with AI-powered analysis and reporting.',
    icon: 'pyramid',
    features: [
      'Real-time dashboards',
      'Predictive analytics',
      'Custom reports',
      'Data visualization'
    ],
    color: '#F59E0B',
    deployment: ['cloud', 'local']
  },
  {
    id: 'social',
    name: 'Social Media Agent',
    description: 'Manage your social presence with automated posting, engagement, and analytics.',
    icon: 'octahedron',
    features: [
      'Content scheduling',
      'Auto-responses',
      'Trend monitoring',
      'Engagement analytics'
    ],
    color: '#EC4899',
    deployment: ['cloud']
  },
  {
    id: 'custom',
    name: 'Custom Agent',
    description: 'Build a tailored AI agent designed specifically for your unique business needs.',
    icon: 'icosahedron',
    features: [
      'Fully customizable',
      'API integrations',
      'Custom workflows',
      'White-label option'
    ],
    color: '#00F5FF',
    deployment: ['cloud', 'local']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow Inc.',
    content: 'WebCraft AI transformed our customer support. Response times dropped by 80% and customer satisfaction soared. The AI agents feel incredibly natural.'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Head of Sales',
    company: 'GrowthLabs',
    content: 'Our sales conversion rate increased by 45% within the first month. The Sales Agent handles qualification perfectly, letting our team focus on closing.'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Operations Director',
    company: 'GlobalServe',
    content: 'The deployment flexibility is unmatched. We run sensitive operations on-premise while leveraging cloud agents for customer-facing tasks.'
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Founder',
    company: 'StartupX',
    content: 'As a startup, we needed enterprise-level AI without the enterprise budget. WebCraft AI delivered exactly that. Game changer for our growth.'
  }
];

export const steps: Step[] = [
  {
    id: '1',
    number: 1,
    title: 'Choose Your Agent',
    description: 'Select from our pre-built agents or create a custom solution tailored to your specific needs.'
  },
  {
    id: '2',
    number: 2,
    title: 'Configure & Train',
    description: 'Upload your knowledge base, set preferences, and train your agent with your business data.'
  },
  {
    id: '3',
    number: 3,
    title: 'Deploy & Scale',
    description: 'Launch your agent in minutes. Monitor performance and scale as your business grows.'
  }
];

export const features: Feature[] = [
  {
    id: '1',
    title: 'Intelligent Automation',
    description: 'Our AI agents understand context, learn from interactions, and continuously improve their responses.',
    icon: 'brain'
  },
  {
    id: '2',
    title: 'Flexible Deployment',
    description: 'Deploy in the cloud for instant scalability or on-premise for maximum data security and control.',
    icon: 'server'
  },
  {
    id: '3',
    title: 'Seamless Integration',
    description: 'Connect with your existing tools and workflows through our extensive API and pre-built integrations.',
    icon: 'plug'
  }
];

export const navLinks = [
  { label: 'Services', href: '/services', sectionId: 'services' },
  { label: 'Why Us', href: '/why-us', sectionId: 'why-us' },
  { label: 'Deployment', href: '/deployment', sectionId: 'deployment' },
  { label: 'How It Works', href: '/how-it-works', sectionId: 'how-it-works' },
  { label: 'Testimonials', href: '/testimonials', sectionId: 'testimonials' }
];

export const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Changelog', href: '/changelog' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' }
  ],
  resources: [
    { label: 'Documentation', href: '/documentation' },
    { label: 'API Reference', href: '/api-reference' },
    { label: 'Community', href: '/community' },
    { label: 'Support', href: '/support' }
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' }
  ]
};
