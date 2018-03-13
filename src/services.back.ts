// --- Backend interface ---

export interface IFruitBack {
  id: number;
  name: string;
  colorValue: string;
  price: number;
}

export interface IShopBack {
  id: number;
  name: string;
  fruits: IFruitBack[];
}

// --- Backend service ---

export function shopsService(): IShopBack[] {
  return [
    {
      id: 1,
      name: 'Super Fruit', 
      fruits: [
        { id: 1, name: 'apples', colorValue: 'green', price: 2.25 },
        { id: 2, name: 'apples', colorValue: 'red', price: 3.15 }
      ]
    },
    { 
      id: 2, 
      name: 'Fruit Mania', 
      fruits: [
        { id: 3, name: 'pears', colorValue: 'yellow', price: 1.05 },
        { id: 3, name: 'kiwis', colorValue: 'green', price: 3.35 }
      ] 
    }
  ];
}
