import { shopsService } from '../services.back';
import { ShopFront, shopsMapper } from './shops.front';

const shops: ShopFront[] = shopsService().map(shopsMapper);
shops.forEach(shop => shop.clone().showcase());
