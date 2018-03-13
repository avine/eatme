import { IShopBack } from '../services.back';
import { FruitFront, fruitsMapper } from './fruits.front';

// --- Frontend shop interface ---

export interface IShopFront {
  id: number;
  name: string;
  fruits: FruitFront[];
}

// --- Frontend shop class ---

export class ShopFront {
  constructor(public shop: IShopFront) {}

  clone() {
    return new ShopFront({
      id: this.shop.id,
      name: this.shop.name,  
      fruits: this.shop.fruits.map(fruit => fruit.clone())
    });
  }

  showcase() {
    console.log(`\nAt "${this.shop.name}", you will find:`);
    this.shop.fruits.forEach(fruit => {
      console.log(fruit.clone().description());
    })
  }
}

// --- Frontend shop mapper ---

export function shopsMapper(shopBack: IShopBack) {
  const shopFront = new ShopFront({
    id: shopBack.id,
    name: shopBack.name, 
    fruits: shopBack.fruits.map(fruitBack => fruitsMapper(fruitBack))
  });
  return shopFront;
}
