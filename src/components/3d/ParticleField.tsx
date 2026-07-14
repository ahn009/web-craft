import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface ParticlesProps {
  count?: number;
  color?: string;
  scrollSpeed?: number;
  mouseInteraction?: boolean;
}

function Particles({ 
  count = 200, 
  color = '#00F5FF',
  scrollSpeed = 1,
  mouseInteraction = true 
}: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  // Generate particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const velArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in 3D space
      posArray[i * 3] = (seededRandom(i * 6 + 1) - 0.5) * 20;
      posArray[i * 3 + 1] = (seededRandom(i * 6 + 2) - 0.5) * 20;
      posArray[i * 3 + 2] = (seededRandom(i * 6 + 3) - 0.5) * 10;
      
      // Random velocities
      velArray[i * 3] = (seededRandom(i * 6 + 4) - 0.5) * 0.02;
      velArray[i * 3 + 1] = (seededRandom(i * 6 + 5) - 0.5) * 0.02;
      velArray[i * 3 + 2] = (seededRandom(i * 6 + 6) - 0.5) * 0.01;
    }
    
    return [posArray, velArray];
  }, [count]);
  
  // Mouse tracking
  useEffect(() => {
    if (!mouseInteraction) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseInteraction]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions based on velocity
      positionArray[i3] += velocities[i3] * scrollSpeed;
      positionArray[i3 + 1] += velocities[i3 + 1] * scrollSpeed;
      positionArray[i3 + 2] += velocities[i3 + 2] * scrollSpeed;
      
      // Mouse interaction - particles are slightly attracted to mouse
      if (mouseInteraction) {
        const mouseX = mouseRef.current.x * viewport.width * 0.5;
        const mouseY = mouseRef.current.y * viewport.height * 0.5;
        
        const dx = mouseX - positionArray[i3];
        const dy = mouseY - positionArray[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 3) {
          positionArray[i3] += dx * 0.001;
          positionArray[i3 + 1] += dy * 0.001;
        }
      }
      
      // Wrap around boundaries
      if (positionArray[i3] > 10) positionArray[i3] = -10;
      if (positionArray[i3] < -10) positionArray[i3] = 10;
      if (positionArray[i3 + 1] > 10) positionArray[i3 + 1] = -10;
      if (positionArray[i3 + 1] < -10) positionArray[i3 + 1] = 10;
      if (positionArray[i3 + 2] > 5) positionArray[i3 + 2] = -5;
      if (positionArray[i3 + 2] < -5) positionArray[i3 + 2] = 5;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Gentle rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Connection lines between nearby particles
function ParticleConnections({ 
  count = 50, 
  maxDistance = 2,
  color = '#00F5FF'
}: { 
  count?: number; 
  maxDistance?: number;
  color?: string;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededRandom(i * 3 + 101) - 0.5) * 15;
      positions[i * 3 + 1] = (seededRandom(i * 3 + 102) - 0.5) * 15;
      positions[i * 3 + 2] = (seededRandom(i * 3 + 103) - 0.5) * 8;
    }
    return positions;
  }, [count]);
  
  useFrame(() => {
    if (!linesRef.current) return;
    
    const positions: number[] = [];
    
    // Find nearby particles and create connections
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = particlePositions[i * 3] - particlePositions[j * 3];
        const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
        const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < maxDistance) {
          positions.push(
            particlePositions[i * 3],
            particlePositions[i * 3 + 1],
            particlePositions[i * 3 + 2],
            particlePositions[j * 3],
            particlePositions[j * 3 + 1],
            particlePositions[j * 3 + 2]
          );
        }
      }
    }
    
    const geometry = linesRef.current.geometry;
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
  });
  
  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  scrollSpeed?: number;
  showConnections?: boolean;
  className?: string;
  mouseInteraction?: boolean;
}

export default function ParticleField({
  count = 200,
  color = '#00F5FF',
  scrollSpeed = 1,
  showConnections = true,
  className = '',
  mouseInteraction = true
}: ParticleFieldProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <Particles 
          count={count} 
          color={color} 
          scrollSpeed={scrollSpeed}
          mouseInteraction={mouseInteraction}
        />
        {showConnections && (
          <ParticleConnections 
            count={Math.min(count, 50)} 
            color={color}
            maxDistance={2}
          />
        )}
      </Canvas>
    </div>
  );
}
