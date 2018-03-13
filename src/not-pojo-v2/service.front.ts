import { FruitFront } from './fruit.front';
import { ShopFront } from './shop.front';

const cloneShop = (shop: ShopFront) => {
  const fruits = shop.fruits.map(
    fruit => new FruitFront(fruit.id, fruit.name, fruit.color)
  );
  return new ShopFront(shop.id, shop.name, fruits);
};

let store: ShopFront[] = [];

export const shopsServiceFront = {
  set(_store: ShopFront[]) {
    store = _store;
  },
  get() {
    return store.map(cloneShop);
  }
};
