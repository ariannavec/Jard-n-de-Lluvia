import React, { createContext, useContext, useState, useMemo } from 'react';
import { TREE_SPECIES, TreeSize, DEFAULT_RAINFALL_MM, HERMOSILLO_CENTER } from '@/lib/data';

interface AnalysisState {
  // Inputs
  area: number;
  setArea: (area: number) => void;
  speciesId: string;
  setSpeciesId: (id: string) => void;
  treeSize: TreeSize;
  setTreeSize: (size: TreeSize) => void;
  rainfall: number;
  setRainfall: (mm: number) => void;
  numGardens: number;
  setNumGardens: (num: number) => void;
  coordinates: [number, number];
  setCoordinates: (coords: [number, number]) => void;

  // Calculated Outputs
  treesNeeded: number;
  tempReduction: number;
  co2Absorbed: number;
  totalCost: number;
  waterCaptured: number;
  waterPerGarden: number;
  runoffReduction: number;
  waterTanks: number;
}

const AnalysisContext = createContext<AnalysisState | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [area, setArea] = useState<number>(1000);
  const [speciesId, setSpeciesId] = useState<string>('mezquite');
  const [treeSize, setTreeSize] = useState<TreeSize>('medium');
  const [rainfall, setRainfall] = useState<number>(DEFAULT_RAINFALL_MM);
  const [numGardens, setNumGardens] = useState<number>(2);
  const [coordinates, setCoordinates] = useState<[number, number]>(HERMOSILLO_CENTER);

  // Derived calculations
  const state = useMemo(() => {
    const species = TREE_SPECIES[speciesId];
    const shadePerTree = species.shadeArea[treeSize];
    
    // Arborization calcs
    const treesNeeded = Math.ceil(area / shadePerTree);
    const tempReduction = Math.min(treesNeeded * 0.3, 8); // Capped at 8 deg C
    const co2Absorbed = treesNeeded * species.co2Absorption;
    const totalCost = treesNeeded * species.cost;

    // Water calcs
    // Area (m2) * rainfall (mm = liters/m2) * 0.8 (80% capture efficiency)
    const waterCaptured = Math.round(area * rainfall * 0.8);
    const waterPerGarden = numGardens > 0 ? Math.round(waterCaptured / numGardens) : 0;
    const runoffReduction = Math.min((area / 1000) * 15, 85); // Estimated % reduction up to 85%
    const waterTanks = +(waterCaptured / 10000).toFixed(1);

    return {
      area, setArea,
      speciesId, setSpeciesId,
      treeSize, setTreeSize,
      rainfall, setRainfall,
      numGardens, setNumGardens,
      coordinates, setCoordinates,
      treesNeeded,
      tempReduction,
      co2Absorbed,
      totalCost,
      waterCaptured,
      waterPerGarden,
      runoffReduction,
      waterTanks
    };
  }, [area, speciesId, treeSize, rainfall, numGardens, coordinates]);

  return (
    <AnalysisContext.Provider value={state}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
