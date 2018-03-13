import { FruitFront } from './fruit.front';
import { ShopFront } from './shop.front';

// Oups! Shop is hard to clone.
// With "Not-Pojo", we need to create instances of the classes again!
const cloneShop = (shop: ShopFront) => {
  const fruits = shop.fruits.map(
    fruit => new FruitFront(fruit.id, fruit.name, fruit.color)
  );
  return new ShopFront(shop.id, shop.name, fruits);
};

// Frontend shop store
let store: ShopFront[] = [];

export const shopsServiceFront = {
  set(_store: ShopFront[]) {
    store = _store;
  },
  get() {
    // Always return a clone for immutability
    return store.map(cloneShop);
  }
};
