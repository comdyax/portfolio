import { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Planet = ({ radius, speed }) => {
  const planetRef = useRef();
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.x += speed[0];
      planetRef.current.rotation.y += speed[1];
      planetRef.current.rotation.z += speed[2];
    }
  });
  const texture = useLoader(THREE.TextureLoader, "/texture_asteroid.png");

  return (
    <group ref={planetRef}>
      <Sphere args={[radius, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          bumpMap={texture}
          bumpScale={6}
          map={texture}
          emissive="#000fff"
          emissiveIntensity={0.001}
          roughness={0.9}
          color="#f0dfc7"
          metalness={0.4}
        />
      </Sphere>
    </group>
  );
};

const AsteroidField = ({
  count,
  radius,
  spread,
  thickness,
  size,
  speed,
  offset,
}) => {
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const distance = radius + Math.random() * spread;
      const x = distance * Math.cos(theta);
      const z = distance * Math.sin(theta);
      const y = (Math.random() - 0.5) * thickness;

      positions.push([x, y, z]);
    }
    return positions;
  }, [count, radius, spread, thickness]);

  const asteroidFieldRef = useRef();
  useFrame(() => {
    if (asteroidFieldRef.current) {
      asteroidFieldRef.current.rotation.x += speed[0];
      asteroidFieldRef.current.rotation.y += speed[1];
      asteroidFieldRef.current.rotation.z += speed[2];
    }
  });

  const texture = useLoader(THREE.TextureLoader, "/asteroid_texture.png");

  return (
    <group ref={asteroidFieldRef} rotation={offset}>
      {positions.map((pos, i) => (
        <Sphere
          key={i}
          args={[size + Math.random() * 0.05, 16, 16]}
          position={pos}
        >
          <meshStandardMaterial
            bumpMap={texture}
            bumpScale={20}
            emissive="#ffffff"  
            emissiveIntensity={0.01}
            roughness={1}
            color="#ffffff"
            metalness={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

const ParticleSystem = () => {
  const offsetRings = [
    [0, 0, 0],
    [Math.PI / 4, 0, 0],
  ];
  return (
    <Canvas
      camera={{
        position: [-50, -5, 40],
      }}
    >
      <OrbitControls maxDistance={40} minDistance={15} />
      <directionalLight />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      {offsetRings.map((offset, key) => (
        <AsteroidField
          key={key}
          radius={3}
          spread={5}
          count={50}
          thickness={10}
          size={0.04}
          speed={[0.0005, 0.0005, 0.0005]}
          offset={offset}
        />
      ))}
      <Planet radius={3.5} speed={[0.0005, 0.0005, 0.0005]} />
      <AsteroidField
        radius={10}
        spread={20}
        count={500}
        thickness={3}
        size={0.05}
        speed={[0, 0.0005, 0]}
        offset={[Math.PI / 4, 0, 0]}
      />
      <Stars
        radius={200}
        depth={100}
        count={2000}
        factor={8}
        saturation={10}
        fade={true}
      />
    </Canvas>
  );
};

export default ParticleSystem;
