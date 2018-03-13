import { shopsServiceBack } from '../service.back';
import { ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const shops: ShopFront[] = shopsServiceBack().map(shopMapper);
shops.forEach(shop => shop.clone().showcase());
