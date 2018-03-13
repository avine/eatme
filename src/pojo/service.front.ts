import { IShopFront } from './shop.front';

const cloneShop = (shop: IShopFront): IShopFront => {
  const fruits = shop.fruits.map(
      fruit => ({ ...fruit })
    );
    return { ...shop, fruits };
  };

let store: IShopFront[] = [];

export const shopsServiceFront = {
  set(_store: IShopFront[]) {
    store = _store;
  },
  get() {
    return store.map(cloneShop);
  }
};
