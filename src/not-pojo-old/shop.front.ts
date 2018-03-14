import { FruitFront } from './fruit.front';

export class ShopFront {
  constructor(
    public id: number,
    public name: string,
    public fruits: FruitFront[]
  ) {}

  // In this first version, cloning is a method of the class...
  clone() {
    return new ShopFront(
      this.id,
      this.name,  
      this.fruits.map(fruit => fruit.clone())
    );
  }

  showcase() {
    console.log(`\nAt "${this.name}", you will find:`);
    this.fruits.forEach(fruit => {
      // The developer himself has to clone the objects each time he has to use them!
      console.log(fruit.clone().description());
    })
  }
}
