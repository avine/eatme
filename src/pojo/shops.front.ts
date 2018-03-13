import { IShopBack } from '../services.back';
import { IFruitFront, FruitFront, fruitsMapper, cloneFruit } from './fruits.front';

// --- Frontend shop interface ---

export interface IShopFront {
  id: number;
  name: string;
  fruits: IFruitFront[];
}

export const cloneShop = (shop: IShopFront): IShopFront => (
  { ...shop, fruits: [ ...shop.fruits ] }
);

// --- Frontend shop class ---

export class ShopFront {
  constructor(public shop: IShopFront) {}

  showcase() {
    console.log(`\nAt "${this.shop.name}", you will find:`);
    this.shop.fruits.forEach(fruit => {
      console.log(new FruitFront(cloneFruit(fruit)).description());
    })
  }
}

// --- Frontend shop mapper ---

export function shopsMapper(shopBack: IShopBack): IShopFront {
  return {
    id: shopBack.id,
    name: shopBack.name, 
    fruits: shopBack.fruits.map(fruitBack => fruitsMapper(fruitBack))
  };
}
