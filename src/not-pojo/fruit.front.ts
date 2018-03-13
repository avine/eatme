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
