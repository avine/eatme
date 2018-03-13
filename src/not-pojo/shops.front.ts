import { IShopBack } from '../services.back';
import { FruitFront, fruitsMapper } from './fruits.front';

// --- Frontend shop class ---

export class ShopFront {
  constructor(
    public id: number,
    public name: string,
    public fruits: FruitFront[]
  ) {}

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
      console.log(fruit.clone().description());
    })
  }
}

// --- Frontend shop mapper ---

export function shopsMapper(shopBack: IShopBack): ShopFront {
  return new ShopFront(
    shopBack.id,
    shopBack.name, 
    shopBack.fruits.map(fruitBack => fruitsMapper(fruitBack))
  );
}
