import { shopsServiceBack } from '../service.back';
import { shopsServiceFront } from './service.front';
import { ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const shops: ShopFront[] = shopsServiceBack().map(shopMapper);
shopsServiceFront.set(shops);

shopsServiceFront.get().forEach(shop => shop.showcase());
