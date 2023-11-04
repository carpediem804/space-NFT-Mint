"use client";
import { useGLTF } from "@react-three/drei";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";

export type PlanetName =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | null;

export const PlanetList = [
  "sun",
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
] as PlanetName[];

interface IPlanet extends Partial<PrimitiveProps> {
  name: PlanetName;
}
const Planet = ({ name, ...primitiveProps }: IPlanet) => {
  const planetRef = useRef<any>();

  const { scene: sun } = useGLTF("https://space.coinyou.io/3d-objects/sun.glb");
  const { scene: mercury } = useGLTF(
    "https://space.coinyou.io/3d-objects/mercury.glb"
  );
  const { scene: venus } = useGLTF(
    "https://space.coinyou.io/3d-objects/venus.glb"
  );
  const { scene: earth } = useGLTF(
    "https://space.coinyou.io/3d-objects/earth.glb"
  );
  const { scene: mars } = useGLTF(
    "https://space.coinyou.io/3d-objects/mars.glb"
  );
  const { scene: jupiter } = useGLTF(
    "https://space.coinyou.io/3d-objects/jupiter.glb"
  );
  const { scene: saturn } = useGLTF(
    "https://space.coinyou.io/3d-objects/saturn.glb"
  );
  const { scene: uranus } = useGLTF(
    "https://space.coinyou.io/3d-objects/uranus.glb"
  );
  const { scene: neptune } = useGLTF(
    "https://space.coinyou.io/3d-objects/neptune.glb"
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scenes = {
    sun,
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
  };
  const scene = useMemo(() => {
    return name ? scenes[name] : null;
  }, [name, scenes]);

  const copyScene = useMemo(() => (scene ? scene.clone() : null), [scene]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.x = 1;
      planetRef.current.rotation.y += 0.009;
    }
  });

  return (
    copyScene !== null && (
      <group key={"planet"} dispose={null} scale={[0.2, 0.2, 0.2]}>
        <primitive
          ref={planetRef}
          object={copyScene.children[copyScene.children.length - 1]}
          {...primitiveProps}
        />
      </group>
    )
  );
};

export default Planet;
