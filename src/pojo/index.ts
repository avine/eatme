import { shopsServiceBack } from '../service.back';
import { shopsServiceFront } from './service.front';
import { IShopFront, ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const shops: IShopFront[] = shopsServiceBack().map(shopMapper);
shopsServiceFront.set(shops);

// With "Pojo", we create lazy class instance, when behavior is needed.
shopsServiceFront.get().forEach(shop => new ShopFront(shop).showcase());
