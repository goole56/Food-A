import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';

const Burger = () => {
  return (
    <group scale={1.5} position={[0, -0.2, 0]}>
      {/* Top Bun */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e8a861" roughness={0.6} />
      </mesh>
      {/* Meat */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
        <meshStandardMaterial color="#5e3919" roughness={0.9} />
      </mesh>
      {/* Cheese */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.2, 0.05, 1.2]} />
        <meshStandardMaterial color="#ffc000" roughness={0.4} />
      </mesh>
      {/* Bottom Bun */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.6, 0.2, 32]} />
        <meshStandardMaterial color="#e8a861" roughness={0.6} />
      </mesh>
    </group>
  );
};

const Sushi = () => {
  return (
    <group scale={1.5}>
      {/* Rice */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      {/* Salmon */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.3, 0.2, 0.7]} />
        <meshStandardMaterial color="#ff7e67" roughness={0.3} />
      </mesh>
      {/* Nori band */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.72]} />
        <meshStandardMaterial color="#2d3436" roughness={0.8} />
      </mesh>
    </group>
  );
};

const Pizza = () => {
  return (
    <group scale={1.2} rotation={[-Math.PI / 8, 0, 0]}>
      {/* Crust */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#e8a861" roughness={0.8} />
      </mesh>
      {/* Cheese */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.1, 32]} />
        <meshStandardMaterial color="#ffd966" roughness={0.4} />
      </mesh>
      {/* Pepperoni 1 */}
      <mesh position={[0.5, 0.12, 0.3]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.6} />
      </mesh>
      {/* Pepperoni 2 */}
      <mesh position={[-0.4, 0.12, 0.6]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.6} />
      </mesh>
      {/* Pepperoni 3 */}
      <mesh position={[-0.6, 0.12, -0.4]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.6} />
      </mesh>
      {/* Pepperoni 4 */}
      <mesh position={[0.3, 0.12, -0.7]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
        <meshStandardMaterial color="#c0392b" roughness={0.6} />
      </mesh>
      {/* Slice cut marks */}
      <mesh position={[0, 0.12, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial color="#e8a861" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial color="#e8a861" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial color="#e8a861" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial color="#e8a861" roughness={0.8} />
      </mesh>
    </group>
  );
};

const Ravioli = () => {
  return (
    <group scale={1.5}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 1.5]} />
        <meshStandardMaterial color="#f0d599" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f0d599" roughness={0.7} />
      </mesh>
    </group>
  );
};

const Cake = () => {
  return (
    <group scale={1.2}>
      {/* Base Cake */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1, 1, 0.8, 32]} />
        <meshStandardMaterial color="#4a3b32" roughness={0.9} />
      </mesh>
      {/* Matcha Lava */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.9, 1.05, 0.1, 32]} />
        <meshStandardMaterial color="#7cb342" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#7cb342" roughness={0.2} />
      </mesh>
    </group>
  );
};

interface Food3DModelProps {
  foodId: string;
}

const ModelMap: Record<string, React.FC> = {
  f1: Burger,
  f2: Sushi,
  f3: Pizza,
  f4: Ravioli,
  f5: Cake,
};

export const Food3DModel: React.FC<Food3DModelProps> = ({ foodId }) => {
  const Model = ModelMap[foodId] || Burger;

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing bg-brand-card">
      <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={1} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Model />
        </Float>
        <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} far={4} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};
