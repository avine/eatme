import { FruitFront } from './fruit.front';

export class ShopFront {
  constructor(
    public id: number,
    public name: string,
    public fruits: FruitFront[]
  ) {}

  showcase() {
    console.log(`\nAt "${this.name}", you will find:`);
    this.fruits.forEach(fruit => {
      console.log(fruit.description());
    })
  }
}
