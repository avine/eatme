import { IShopFront } from './shop.front';

// With "Pojo", we just need to clone "Pojo" objects!
const cloneShop = (shop: IShopFront): IShopFront => {
  const fruits = shop.fruits.map(
      fruit => ({ ...fruit })
    );
    return { ...shop, fruits };
  };

// Frontend shop store
let store: IShopFront[] = [];

export const shopsServiceFront = {
  set(_store: IShopFront[]) {
    store = _store;
  },

  get() {
    // Always return a clone for immutability
    return store.map(cloneShop);
  }
};
