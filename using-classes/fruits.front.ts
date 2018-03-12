import { FruitBack } from '../services.back';

// Frontend fruit model
export class FruitFront {
  id: number;
  name: string;
  color: string; // In our Frontend, "colorValue" is named "color"
  // price: number; // Assuming our Frontend don't need to consume the price for now

  // Hum... We need some behavior, side by side with the instances properties :(
  description() {
    return `- des ${this.name} ${this.color}.`;
  }

  // Hum... We should be immutable some time... But it's hard to clone :(
  clone() {
    const clone = new FruitFront();

    // We need to extract the instance properties :(
    Object.getOwnPropertyNames(this).forEach(
      (prop: string) => clone[prop] = this[prop]
    );

    return clone;
  }
}

// Frontend fruit mapper
export function fruitsMapper(fruitBack: FruitBack) {
  const fruitFront = new FruitFront();

  fruitFront.id = fruitBack.id;
  fruitFront.name = fruitBack.name;
  fruitFront.color = fruitBack.colorValue;

  return fruitFront;
}
