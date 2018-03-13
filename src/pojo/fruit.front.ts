export interface IFruitFront {
  id: number;
  name: string;
  color: string; // In our Frontend, "colorValue" is named "color"
  // price: number; // Assuming our Frontend don't need to consume the price
}

export class FruitFront {
  constructor(public fruit: IFruitFront) {}

  description() {
    return `- some ${this.fruit.color} ${this.fruit.name}.`;
  }
}
