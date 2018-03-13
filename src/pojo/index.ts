import { shopsService } from '../services.back';
import { IShopFront, ShopFront, shopsMapper } from './shops.front';

const shops: IShopFront[] = shopsService().map(shopsMapper);

const cloneShop = (shop: IShopFront): IShopFront => {
  const fruits = shop.fruits.map(
    fruit => ({ ...fruit })
  );
  return { ...shop, fruits };
};

shops.map(shop => cloneShop(shop))
  .forEach(shop => new ShopFront(shop).showcase());
