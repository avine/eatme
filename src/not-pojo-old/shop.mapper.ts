import { IShopBack } from '../service.back';
import { fruitMapper } from './fruit.mapper';
import { ShopFront } from './shop.front';

// With "Not-Pojo", we create eager class instance, when mapping the backend service!
export const shopMapper = (shopBack: IShopBack): ShopFront =>
  new ShopFront(
    shopBack.id,
    shopBack.name, 
    shopBack.fruits.map(fruitBack => fruitMapper(fruitBack))
  );
