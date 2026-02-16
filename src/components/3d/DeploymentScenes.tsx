import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Cloud Deployment Scene
function CloudScene() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Generate floating data particles
  const { positions, colors } = useMemo(() => {
    const count = 100;
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 8;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 6;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 4;
      
      // Cyan and purple colors
      const isCyan = Math.random() > 0.5;
      colorArray[i * 3] = isCyan ? 0 : 0.55;
      colorArray[i * 3 + 1] = isCyan ? 0.96 : 0.36;
      colorArray[i * 3 + 2] = isCyan ? 1 : 0.96;
    }
    
    return { positions: posArray, colors: colorArray };
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Central cloud cluster */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#00F5FF"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.9}
            emissive="#00F5FF"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
      
      {/* Orbiting cloud spheres */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float
            key={i}
            speed={1.5 + i * 0.2}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <mesh position={[x, Math.sin(i) * 0.5, z]}>
              <sphereGeometry args={[0.4 + i * 0.1, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#00F5FF' : '#8B5CF6'}
                transparent
                opacity={0.6}
                roughness={0.2}
                metalness={0.8}
                emissive={i % 2 === 0 ? '#00F5FF' : '#8B5CF6'}
                emissiveIntensity={0.3}
              />
            </mesh>
          </Float>
        );
      })}
      
      {/* Data particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              0, 0, 0, 2.5, 0.5, 0,
              0, 0, 0, -2, 0.3, 1.5,
              0, 0, 0, 1, -0.5, -2,
              0, 0, 0, -1.5, 0.8, -1.8,
              0, 0, 0, 2, -0.3, 1.2,
            ]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00F5FF" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// Local/Server Deployment Scene
function ServerScene() {
  const groupRef = useRef<THREE.Group>(null);
  const serverRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    // Animate server lights
    serverRefs.current.forEach((server, i) => {
      if (server) {
        const material = server.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
      }
    });
  });
  
  return (
    <group ref={groupRef}>
      {/* Server rack */}
      {[...Array(4)].map((_, i) => (
        <Float
          key={i}
          speed={1}
          rotationIntensity={0.1}
          floatIntensity={0.2}
        >
          <group position={[(i - 1.5) * 1.2, 0, 0]}>
            {/* Server box */}
            <mesh>
              <boxGeometry args={[0.8, 2.5, 1]} />
              <meshStandardMaterial
                color="#1a1a2e"
                roughness={0.4}
                metalness={0.8}
              />
            </mesh>
            
            {/* Server front panel */}
            <mesh position={[0, 0, 0.51]}>
              <boxGeometry args={[0.75, 2.45, 0.02]} />
              <meshStandardMaterial
                color="#0f0f1a"
                roughness={0.3}
                metalness={0.9}
              />
            </mesh>
            
            {/* LED indicators */}
            {[...Array(8)].map((_, j) => (
              <mesh
                key={j}
                ref={(el) => {
                  if (el) serverRefs.current[i * 8 + j] = el;
                }}
                position={[-0.25 + (j % 2) * 0.5, 0.8 - Math.floor(j / 2) * 0.5, 0.53]}
              >
                <circleGeometry args={[0.04, 8]} />
                <meshStandardMaterial
                  color={j % 3 === 0 ? '#00F5FF' : j % 3 === 1 ? '#8B5CF6' : '#10B981'}
                  emissive={j % 3 === 0 ? '#00F5FF' : j % 3 === 1 ? '#8B5CF6' : '#10B981'}
                  emissiveIntensity={0.5}
                />
              </mesh>
            ))}
            
            {/* Ventilation slots */}
            {[...Array(5)].map((_, j) => (
              <mesh key={j} position={[0, -0.8 + j * 0.15, 0.53]}>
                <boxGeometry args={[0.5, 0.02, 0.01]} />
                <meshBasicMaterial color="#333" />
              </mesh>
            ))}
          </group>
        </Float>
      ))}
      
      {/* Network connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -1.8, -1.5, 0, 1.8, -1.5, 0,
              -1.8, -1.5, 0, -1.8, -2, 0.5,
              1.8, -1.5, 0, 1.8, -2, 0.5,
              0, -1.5, 0, 0, -2, 0.5,
              -0.6, -1.5, 0, -0.6, -2, 0.5,
              0.6, -1.5, 0, 0.6, -2, 0.5,
            ]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
      </lineSegments>
      
      {/* Data flow particles */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-1.8 + i * 0.72, -1.8, 0.5]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? '#00F5FF' : '#8B5CF6'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

interface DeploymentSceneProps {
  type: 'cloud' | 'server';
  className?: string;
}

export default function DeploymentScene({ type, className = '' }: DeploymentSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00F5FF" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[0, 5, -5]} intensity={0.3} color="#ffffff" />
        
        {type === 'cloud' ? <CloudScene /> : <ServerScene />}
      </Canvas>
    </div>
  );
}

// Comparison view showing both options
interface DeploymentComparisonProps {
  className?: string;
}

export function DeploymentComparison({ className = '' }: DeploymentComparisonProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent rounded-2xl" />
        <DeploymentScene type="cloud" />
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <h3 className="text-lg font-semibold text-cyan mb-1">Cloud Deployment</h3>
          <p className="text-sm text-muted-foreground">Scale instantly with global reach</p>
        </div>
      </div>
      
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-purple/5 to-transparent rounded-2xl" />
        <DeploymentScene type="server" />
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <h3 className="text-lg font-semibold text-purple mb-1">On-Premise</h3>
          <p className="text-sm text-muted-foreground">Maximum control and security</p>
        </div>
      </div>
    </div>
  );
}
