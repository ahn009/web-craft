import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout Components
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

// Section Components
import Hero from '@/sections/Hero';
import ServicesGrid from '@/sections/ServicesGrid';
import WhyUs from '@/sections/WhyUs';
import DeploymentOptions from '@/sections/DeploymentOptions';
import HowItWorks from '@/sections/HowItWorks';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
    
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Services Grid */}
        <ServicesGrid />
        
        {/* Why Choose Us */}
        <WhyUs />
        
        {/* Deployment Options */}
        <DeploymentOptions />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Call to Action */}
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
