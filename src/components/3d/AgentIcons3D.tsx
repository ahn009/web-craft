import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { AgentIcon } from '@/types';

interface AgentShapeProps {
  type: AgentIcon;
  color: string;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

function AgentShape({ type, color, isHovered, onHover }: AgentShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    
    // Scale on hover
    const targetScale = isHovered ? 1.3 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
    
    // Glow pulse
    if (glowRef.current) {
      const pulseScale = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      glowRef.current.scale.setScalar(pulseScale);
    }
  });
  
  const getGeometry = () => {
    switch (type) {
      case 'cube':
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusKnotGeometry args={[0.4, 0.15, 100, 16]} />;
      case 'pyramid':
        return <coneGeometry args={[0.7, 1.2, 4]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.7]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.7]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };
  
  const baseColor = new THREE.Color(color);
  
  return (
    <group>
      {/* Main shape */}
      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={0.4}
      >
        <mesh
          ref={meshRef}
          onPointerOver={() => onHover(true)}
          onPointerOut={() => onHover(false)}
        >
          {getGeometry()}
          <meshStandardMaterial
            color={baseColor}
            roughness={0.2}
            metalness={0.9}
            emissive={baseColor}
            emissiveIntensity={isHovered ? 0.4 : 0.15}
          />
        </mesh>
        
        {/* Wireframe */}
        <mesh>
          {getGeometry()}
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      </Float>
      
      {/* Hover tooltip */}
      {isHovered && (
        <Html distanceFactor={10}>
          <div className="bg-navy-900/90 backdrop-blur-sm border border-cyan/30 rounded-lg px-3 py-1.5 text-cyan text-xs whitespace-nowrap pointer-events-none">
            Click to explore
          </div>
        </Html>
      )}
    </group>
  );
}

interface AgentIcon3DProps {
  type: AgentIcon;
  color: string;
  size?: string;
  className?: string;
  onClick?: () => void;
}

export default function AgentIcon3D({ 
  type, 
  color, 
  size = '120px',
  className = '',
  onClick
}: AgentIcon3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color={color} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />
        <AgentShape 
          type={type} 
          color={color} 
          isHovered={isHovered}
          onHover={setIsHovered}
        />
      </Canvas>
    </div>
  );
}

// Grid of agent icons
interface AgentIconGridProps {
  agents: Array<{
    type: AgentIcon;
    color: string;
    name: string;
  }>;
  className?: string;
}

export function AgentIconGrid({ agents, className = '' }: AgentIconGridProps) {
  return (
    <div className={`grid grid-cols-3 gap-8 ${className}`}>
      {agents.map((agent, index) => (
        <div 
          key={index}
          className="flex flex-col items-center gap-3 group"
        >
          <div className="relative transition-transform duration-300 group-hover:scale-110">
            <AgentIcon3D
              type={agent.type}
              color={agent.color}
              size="100px"
            />
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-cyan transition-colors">
            {agent.name}
          </span>
        </div>
      ))}
    </div>
  );
}
