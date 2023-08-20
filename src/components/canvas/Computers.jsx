import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2.5} groundColor='black' />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}   
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -2.4, -1.8] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]} 
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Añadimos un eventListener para los cambios en el tamaño de la pantalla
    const mediaQuery = window.matchMedia('(max-width: 900px)');

    // Establecer el valor inicial de la variable de estado `isMobile`
    setIsMobile(mediaQuery.matches);
    
    // Define una callback function para entregar los cambios a las mediaQuerys
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches)
    }

    // Añade la callback function al eventListener para cambios en la mediaquery
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    // Elimina el listener cuando el componente no se use mas.
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25}} // fov: Field Of View
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense
        fallback={<CanvasLoader />}
      > 
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
