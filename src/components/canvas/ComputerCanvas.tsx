"use client";
import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../ui/CanvasLoader";

// Computers
const Computer1 = ({ isMobile }: { isMobile: boolean }) => {
  // Import scene
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    // Mesh
    <mesh>
      {/* Lights */}
      <hemisphereLight intensity={2} groundColor="black" />
      <pointLight intensity={5} color="white" position={[0, 3, 0]} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.75}
        position={isMobile ? [0, -3, 0] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const Computer2 = ({ isMobile }: { isMobile: boolean }) => {
  // Import scene
  const computer = useGLTF("./desktop-pc2/scene.gltf");

  return (
    // Mesh
    <mesh>
      {/* Lights */}
      <hemisphereLight intensity={3} groundColor="black" />
      {/* <pointLight intensity={10} color="white" position={[0, 5, 0]} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-mapSize={1024}
      /> */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.12 : 0.12}
        position={isMobile ? [0, -3, 0] : [0, -3.25, -1.5]}
        rotation={[0, 1.3, 0]}
      />
    </mesh>
  );
};

// Computer Canvas
const ComputerCanvas = () => {
  // state to check mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is Mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    // handle screen size change
    const handleMediaQueryChange = (event: any) => {
      setIsMobile(event?.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Memoize the Computer component
  const MemoizedComputer = useMemo(() => <Computer1 isMobile={isMobile} />, [isMobile]);

  // if (isMobile) return null;
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* Canvas Loader show on fallback */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Show Model */}
        {MemoizedComputer}
      </Suspense>

      {/* Preload all */}
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
