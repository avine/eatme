import { shopsService } from '../services.back';
import { ShopFront, shopsMapper } from './shops.front';
import { FruitFront } from '../not-pojo-v2/fruits.front';

const shops: ShopFront[] = shopsService().map(shopsMapper);

const cloneShop = (shop: ShopFront) => {
  const fruits = shop.fruits.map(
    fruit => new FruitFront(fruit.id, fruit.name, fruit.color)
  );
  return new ShopFront(shop.id, shop.name, fruits);
};

shops.map(shop => cloneShop(shop))
  .forEach(shop => shop.showcase());
