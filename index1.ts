import { shopsService } from './services.back';
import { ShopFront, shopsMapper } from './using-classes/shops.front';

// L(a)unch time!
const shops: ShopFront[] = shopsService().map(shopsMapper);

// Let's try to clone and display shop showcase
shops.forEach(shop => shop.clone().showcase());
