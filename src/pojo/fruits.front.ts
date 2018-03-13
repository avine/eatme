import { IFruitBack } from '../services.back';

// --- Frontend fruit interface ---

export interface IFruitFront {
  id: number;
  name: string;
  color: string; // In our Frontend, "colorValue" is named "color"
  // price: number; // Assuming our Frontend don't need to consume the price
}

// --- Frontend fruit class ---

export class FruitFront {
  constructor(public fruit: IFruitFront) {}

  clone() {
    return new FruitFront({ ...this.fruit });
  }

  description() {
    return `- some ${this.fruit.color} ${this.fruit.name}.`;
  }
}

// --- Frontend fruit mapper ---

export function fruitsMapper(fruitBack: IFruitBack) {
  const fruitFront = new FruitFront({
    id: fruitBack.id, 
    name: fruitBack.name, 
    color: fruitBack.colorValue 
  });
  return fruitFront;
}
