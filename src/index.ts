import { shopsService } from './services.back';

let shops;

console.log('\n*** Using "not-pojo" ***');

import * as NotPojo from './not-pojo/shops.front';
(shops as NotPojo.ShopFront[]) = shopsService().map(NotPojo.shopsMapper);
shops.forEach(shop => shop.clone().showcase());

console.log('\n*** Using "Pojo" ***');

import * as Pojo from './pojo/shops.front';
(shops as Pojo.ShopFront[]) = shopsService().map(Pojo.shopsMapper);
shops.forEach(shop => shop.clone().showcase());
