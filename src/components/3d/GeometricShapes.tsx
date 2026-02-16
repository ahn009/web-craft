import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { AgentIcon } from '@/types';

interface ShapeProps {
  type: AgentIcon;
  color: string;
  size?: number;
  hoverScale?: number;
  isHovered?: boolean;
}

function Shape({ type, color, size = 1, hoverScale = 1.2, isHovered = false }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const targetScale = isHovered || hovered ? hoverScale : 1;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth scale transition
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
    
    // Rotation animation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  
  const getGeometry = () => {
    switch (type) {
      case 'cube':
        return <boxGeometry args={[size, size, size]} />;
      case 'sphere':
        return <sphereGeometry args={[size * 0.6, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[size * 0.5, size * 0.2, 16, 100]} />;
      case 'pyramid':
        return <coneGeometry args={[size * 0.6, size, 4]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size * 0.6]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[size * 0.6]} />;
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  };
  
  const getMaterial = () => {
    const baseColor = new THREE.Color(color);
    
    if (type === 'sphere') {
      return (
        <MeshDistortMaterial
          color={baseColor}
          transparent
          opacity={0.8}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      );
    }
    
    if (type === 'cube') {
      return (
        <MeshWobbleMaterial
          color={baseColor}
          transparent
          opacity={0.8}
          factor={0.4}
          speed={2}
          roughness={0.3}
          metalness={0.7}
        />
      );
    }
    
    return (
      <meshStandardMaterial
        color={baseColor}
        transparent
        opacity={0.85}
        roughness={0.2}
        metalness={0.8}
        emissive={baseColor}
        emissiveIntensity={0.2}
      />
    );
  };
  
  return (
    <Float
      speed={3}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getGeometry()}
        {getMaterial()}
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh>
        {getGeometry()}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh scale={1.3}>
        {getGeometry()}
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}

interface GeometricShapeProps {
  type: AgentIcon;
  color: string;
  size?: number;
  hoverScale?: number;
  className?: string;
  isHovered?: boolean;
}

export function GeometricShape({
  type,
  color,
  size = 1.5,
  hoverScale = 1.2,
  className = '',
  isHovered = false
}: GeometricShapeProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color={color} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />
        <Shape 
          type={type} 
          color={color} 
          size={size} 
          hoverScale={hoverScale}
          isHovered={isHovered}
        />
      </Canvas>
    </div>
  );
}

// Floating shapes for background decoration
interface FloatingShapesProps {
  count?: number;
  className?: string;
}

export function FloatingShapes({ count = 5, className = '' }: FloatingShapesProps) {
  const shapes: AgentIcon[] = ['cube', 'sphere', 'torus', 'pyramid', 'octahedron'];
  const colors = ['#00F5FF', '#8B5CF6', '#EC4899', '#F59E0B', '#25D366'];
  
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${10 + (i * 20)}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: '80px',
            height: '80px',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`,
            opacity: 0.3,
          }}
        >
          <GeometricShape
            type={shapes[i % shapes.length]}
            color={colors[i % colors.length]}
            size={0.8}
          />
        </div>
      ))}
    </div>
  );
}

export default GeometricShape;
