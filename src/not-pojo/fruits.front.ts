import { IFruitBack } from '../services.back';

// --- Frontend fruit class ---

export class FruitFront {
  constructor(
    public id: number,
    public name: string,
    public color: string // In our Frontend, "colorValue" is named "color"
    // price: number // Assuming our Frontend don't need to consume the price
  ) {}

  clone() {
    return new FruitFront(
      this.id,
      this.name,
      this.color
    );
  }

  description() {
    return `- some ${this.color} ${this.name}.`;
  }
}

// --- Frontend fruit mapper ---

export function fruitsMapper(fruitBack: IFruitBack): FruitFront {
  return new FruitFront(
    fruitBack.id,
    fruitBack.name,
    fruitBack.colorValue
  );
}
