// Agent Types
export type AgentIcon = 'cube' | 'sphere' | 'torus' | 'pyramid' | 'octahedron' | 'icosahedron';
export type DeploymentType = 'cloud' | 'local';

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: AgentIcon;
  features: string[];
  color: string;
  deployment: DeploymentType[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// 3D Component Types
export interface ParticleFieldProps {
  count?: number;
  color?: string;
  scrollSpeed?: number;
}

export interface BrainSphereProps {
  size?: number;
  color?: string;
  wireframe?: boolean;
}

export interface GeometricShapeProps {
  type: AgentIcon;
  color: string;
  size?: number;
  hoverScale?: number;
}

export interface DeploymentSceneProps {
  type: 'cloud' | 'server';
  animated?: boolean;
}
