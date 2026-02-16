import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralSphereProps {
  size?: number;
  color?: string;
  wireframe?: boolean;
}

function NeuralSphere({ size = 2.5, color = '#00F5FF', wireframe = true }: NeuralSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Points>(null);
  
  // Generate neural network nodes
  const { positionArray, colorArray } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = size * (0.7 + Math.random() * 0.4);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Color variation between cyan and purple
      const isCyan = Math.random() > 0.5;
      colors[i * 3] = isCyan ? 0 : 0.55;
      colors[i * 3 + 1] = isCyan ? 0.96 : 0.36;
      colors[i * 3 + 2] = isCyan ? 1 : 0.96;
    }
    
    return { positionArray: positions, colorArray: colors };
  }, [size]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      wireframeRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  return (
    <group>
      {/* Main sphere with distortion */}
      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={0.5}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 64, 64]} />
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.15}
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      {/* Wireframe overlay */}
      {wireframe && (
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[size * 1.1, 2]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
      
      {/* Neural nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positionArray, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colorArray, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[size * 1.3, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

interface BrainSphereProps {
  size?: number;
  color?: string;
  wireframe?: boolean;
  className?: string;
}

export default function BrainSphere({ 
  size = 2.5, 
  color = '#00F5FF', 
  wireframe = true,
  className = ''
}: BrainSphereProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F5FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <NeuralSphere size={size} color={color} wireframe={wireframe} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
