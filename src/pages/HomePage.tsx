import Hero from '@/sections/Hero';
import ServicesGrid from '@/sections/ServicesGrid';
import WhyUs from '@/sections/WhyUs';
import DeploymentOptions from '@/sections/DeploymentOptions';
import HowItWorks from '@/sections/HowItWorks';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <DeploymentOptions />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
