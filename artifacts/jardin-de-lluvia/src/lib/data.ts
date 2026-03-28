export type TreeSize = 'small' | 'medium' | 'large';

export interface TreeSpecies {
  id: string;
  name: string;
  shadeArea: Record<TreeSize, number>; // m2
  co2Absorption: number; // kg/year
  cost: number; // MXN
  waterNeed: 'low' | 'medium' | 'high';
}

export const TREE_SPECIES: Record<string, TreeSpecies> = {
  mezquite: {
    id: 'mezquite',
    name: 'Mezquite',
    shadeArea: { small: 25, medium: 50, large: 80 },
    co2Absorption: 18,
    cost: 350,
    waterNeed: 'low'
  },
  paloverde: {
    id: 'paloverde',
    name: 'Palo Verde',
    shadeArea: { small: 20, medium: 40, large: 65 },
    co2Absorption: 15,
    cost: 300,
    waterNeed: 'low'
  },
  sicomoro: {
    id: 'sicomoro',
    name: 'Sicomoro',
    shadeArea: { small: 35, medium: 70, large: 120 },
    co2Absorption: 25,
    cost: 500,
    waterNeed: 'high'
  },
  eucalipto: {
    id: 'eucalipto',
    name: 'Eucalipto',
    shadeArea: { small: 30, medium: 60, large: 100 },
    co2Absorption: 22,
    cost: 250,
    waterNeed: 'medium'
  },
  fresno: {
    id: 'fresno',
    name: 'Fresno',
    shadeArea: { small: 28, medium: 55, large: 90 },
    co2Absorption: 20,
    cost: 400,
    waterNeed: 'medium'
  },
  lluvia: {
    id: 'lluvia',
    name: 'Árbol de Lluvia',
    shadeArea: { small: 40, medium: 80, large: 140 },
    co2Absorption: 30,
    cost: 600,
    waterNeed: 'medium'
  }
};

export const HERMOSILLO_CENTER: [number, number] = [29.0729, -110.9559];
export const DEFAULT_RAINFALL_MM = 350;
