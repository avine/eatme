// --- Backend data model ---

export interface FruitBack {
  id: number;
  name: string;
  colorValue: string;
  price: number;
}

export interface ShopBack {
  id: number;
  name: string;
  fruits: FruitBack[];
}

// --- Backend service ---

export function shopsService(): ShopBack[] {
  return [
    {
      id: 1,
      name: 'FruitMe', 
      fruits: [
        { id: 1, name: 'pommes', colorValue: 'vertes', price: 2.25 },
        { id: 2, name: 'pommes', colorValue: 'rouges', price: 3.15 }
      ]
    },
    { 
      id: 2, 
      name: 'FruitMania', 
      fruits: [
        { id: 3, name: 'poires', colorValue: 'jaunes', price: 1.05 },
        { id: 3, name: 'oranges', colorValue: 'sanguines', price: 3.35 }
      ] 
    }
  ];
}
