"use client";
import { PlanetName } from "@/app/components/Planet/Planet";
import { ReactNode, createContext, useState } from "react";

interface ISpaceContext {
  planet: PlanetName;
  showPlanet: (planet: PlanetName) => void;
  clearPlanet: () => void;
}

export const SpaceContext = createContext<ISpaceContext>({
  planet: null,
  showPlanet: () => {},
  clearPlanet: () => {},
});

interface SpaceContextProviderProps {
  children: ReactNode;
}

export const SpaceContextProvider = ({
  children,
}: SpaceContextProviderProps) => {
  const [planet, setPlanet] = useState<PlanetName | null>(null);

  const showPlanet = (planet: PlanetName) => {
    setPlanet(null); // Clear the current planet
    setTimeout(() => setPlanet(planet), 5); // Set the new planet after a delay to ensure the previous one is removed
  };

  const clearPlanet = () => {
    setPlanet(null);
  };

  return (
    <SpaceContext.Provider value={{ planet, showPlanet, clearPlanet }}>
      {children}
    </SpaceContext.Provider>
  );
};
