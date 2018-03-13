import { IShopBack } from '../services.back';
import { FruitFront, fruitsMapper } from './fruits.front';

// --- Frontend shop class ---

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

// --- Frontend shop mapper ---

export const shopsMapper = (shopBack: IShopBack): ShopFront =>
  new ShopFront(
    shopBack.id,
    shopBack.name, 
    shopBack.fruits.map(fruitBack => fruitsMapper(fruitBack))
  );
