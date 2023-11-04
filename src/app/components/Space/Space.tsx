"use client";
import styled from "@emotion/styled/macro";

import React, { CanvasHTMLAttributes, useContext } from "react";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

import dynamic from "next/dynamic";
import Planet from "../Planet/Planet";
import { SpaceContext } from "../../../../contexts/useSpace";

// const Points = dynamic(
//   () => import("@react-three/drei").then((mod) => mod.Points),
//   {
//     ssr: false,
//   }
// );
// const PointMaterial = dynamic(
//   () => import("@react-three/drei").then((mod) => mod.PointMaterial),
//   {
//     ssr: false,
//   }
// );

function Stars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    if (ref.current?.rotation) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export const Space = (props: CanvasHTMLAttributes<any>) => {
  const { planet } = useContext(SpaceContext);

  return (
    <div>
      <Canvas camera={{ position: [0, 0, 1] }} {...props}>
        <Stars />
        <Planet name={planet} position={[0, 2, 0]} />
        {/* Ambient Light 강도를 더 높였습니다. */}
        {/* Ambient Light 강도를 적절한 수준으로 조절했습니다. */}
        <ambientLight intensity={1.3} />

        {/* Directional Light 위치와 타겟을 수정했습니다. */}
        <directionalLight
          position={[1, 1, 0.8]}
          intensity={14}
          target-position={[0, 2, 0]} // 구의 위치로 조명을 향하게 합니다.
        />

        {/* Spot Light의 속성을 더 조절했습니다. */}
        <spotLight
          position={[0, 5, 0]}
          target-position={[0, 2.3, 0]} // 구의 위치로 조명을 향하게 합니다.
          distance={70}
          intensity={3}
          angle={0.5}
          penumbra={1}
        />
      </Canvas>
    </div>
  );
};
