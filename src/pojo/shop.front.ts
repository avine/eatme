import { FruitFront, IFruitFront } from './fruit.front';

export interface IShopFront {
  id: number;
  name: string;
  fruits: IFruitFront[];
}

export class ShopFront {
  constructor(public shop: IShopFront) {}

  showcase() {
    console.log(`\nAt "${this.shop.name}", you will find:`);
    this.shop.fruits.forEach(fruit => {
      // With "Pojo", we create lazy class instance, when behavior is needed.
      console.log(new FruitFront(fruit).description());
    })
  }
}
