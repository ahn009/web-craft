import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Fade in up animation
export const fadeInUp = (
  element: HTMLElement | string,
  delay: number = 0,
  duration: number = 0.8
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

// Fade in animation
export const fadeIn = (
  element: HTMLElement | string,
  delay: number = 0,
  duration: number = 0.6
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
};

// Scale in animation
export const scaleIn = (
  element: HTMLElement | string,
  delay: number = 0,
  duration: number = 0.6
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

// Stagger children animation
export const staggerChildren = (
  container: HTMLElement | string,
  children: string,
  stagger: number = 0.1,
  duration: number = 0.6
) => {
  return gsap.fromTo(
    `${container} ${children}`,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
    }
  );
};

// Scroll trigger fade in up
export const scrollFadeInUp = (
  element: HTMLElement | string,
  trigger?: HTMLElement | string,
  start: string = 'top 80%'
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || element,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};

// Scroll trigger stagger
export const scrollStagger = (
  container: HTMLElement | string,
  children: string,
  start: string = 'top 80%',
  stagger: number = 0.15
) => {
  return gsap.fromTo(
    `${container} ${children}`,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};

// Parallax effect
export const parallax = (
  element: HTMLElement | string,
  speed: number = 0.5,
  trigger?: HTMLElement | string
) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Draw SVG line animation
export const drawLine = (
  element: SVGPathElement | string,
  trigger?: HTMLElement | string,
  start: string = 'top 70%'
) => {
  const path = typeof element === 'string' 
    ? document.querySelector(element) as SVGPathElement 
    : element;
    
  if (!path) return null;
  
  const length = path.getTotalLength();
  
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
  
  return gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: trigger || element,
      start,
      toggleActions: 'play none none none',
    },
  });
};

// Counter animation
export const animateCounter = (
  element: HTMLElement | string,
  endValue: number,
  duration: number = 2,
  suffix: string = ''
) => {
  const obj = { value: 0 };
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      if (el) {
        el.textContent = Math.round(obj.value) + suffix;
      }
    },
  });
};

// Create timeline for sequential animations
export const createTimeline = (defaults?: gsap.TimelineVars) => {
  return gsap.timeline(defaults);
};

// Kill all scroll triggers (useful for cleanup)
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh scroll triggers (useful after layout changes)
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};
