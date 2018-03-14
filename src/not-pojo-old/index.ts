import { shopsServiceBack } from '../service.back';
import { ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const shops: ShopFront[] = shopsServiceBack().map(shopMapper);

// The developer himself has to clone the objects each time he has to use them!
shops.forEach(shop => shop.clone().showcase());
