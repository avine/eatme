import { ShopBack } from '../services.back';
import { FruitFront, fruitsMapper } from './fruits.front';

// Frontend shop model
export class ShopFront {
  id: number;
  name: string;
  fruits: FruitFront[];

  showcase() {
    console.log(`\nChez "${this.name}", tu trouveras:`);
    this.fruits.forEach(fruit => {
      console.log(fruit.description());
    })
  }

  // Hum... We should be immutable some time... But it's really hard to clone :(
  clone() {
    const clone = new ShopFront();

    clone.id = this.id;
    clone.name = this.name;

    // Hum... We need to clone each FruitFront instance :(
    clone.fruits = this.fruits.map(
      fruit => fruit.clone()
    );

    return clone;
  }
}

// Frontend shop mapper
export function shopsMapper(shopBack: ShopBack) {
  const shopFront = new ShopFront();

  shopFront.id = shopBack.id;
  shopFront.name = shopBack.name;

  shopFront.fruits = shopBack.fruits.map(
    fruitBack => fruitsMapper(fruitBack)
  );

  return shopFront;
}
