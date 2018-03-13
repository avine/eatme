import { shopsService } from '../services.back';
import { IShopFront, ShopFront, shopsMapper, cloneShop } from './shops.front';

const shops: IShopFront[] = shopsService().map(shopsMapper);
shops.forEach(shop => new ShopFront(cloneShop(shop)).showcase());
