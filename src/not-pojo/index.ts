import { shopsServiceBack } from '../service.back';
import { shopsServiceFront } from './service.front';
import { ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const app = {
  fetch() {
    const shops: ShopFront[] = shopsServiceBack().map(shopMapper);
    shopsServiceFront.set(shops);
    return this; // Enable chaining
  },

  display() {
    shopsServiceFront.get().forEach(shop => shop.showcase());
  }
};

app.fetch().display();
