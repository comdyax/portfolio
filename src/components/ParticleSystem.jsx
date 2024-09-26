import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const SpaceTrash = ({ count, radius, spread }) => {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const distance = radius + Math.random() * spread;
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count, radius, spread]);

  const trashFieldRef = useRef();
  useFrame(() => {
    if (trashFieldRef.current) {
      trashFieldRef.current.rotation.y -= 0.004;
    }
  });

  return (
    <Points ref={trashFieldRef} positions={positions}>
      <PointMaterial size={0.02} color="#00ffff" />
    </Points>
  );
};

const AsteroidField = ({ count, radius, spread, thickness }) => {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const distance = radius + Math.random() * spread;
      const x = distance * Math.cos(theta);
      const z = distance * Math.sin(theta);
      const y = (Math.random() - 0.5) * thickness;

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count, radius, spread, thickness]);

  const asteroidFieldRef = useRef();
  useFrame(() => {
    if (asteroidFieldRef.current) {
      asteroidFieldRef.current.rotation.y += 0.001;
    }
  });

  return (

    <Points ref={asteroidFieldRef} positions={positions} rotation={[1.8, 0, 0]}>
      <PointMaterial size={0.02} color="#00ffff" />
    </Points>
  );
};

const ParticleSystem = () => {
  return (
    <Canvas camera={{ position: [10, 2.4, 10] }}>
      <SpaceTrash radius={1} spread={3} count={20000} />
      <SpaceTrash radius={10} spread={10} count={10000} />
      <AsteroidField radius={3} spread={6} count={20000} thickness={0.001} />
    </Canvas>
  );
};

export default ParticleSystem;
