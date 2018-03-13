import { IShopBack } from '../service.back';
import { fruitMapper } from './fruit.mapper';
import { IShopFront } from './shop.front';

export const shopMapper = (shopBack: IShopBack): IShopFront => ({
  id: shopBack.id,
  name: shopBack.name, 
  fruits: shopBack.fruits.map(fruitBack => fruitMapper(fruitBack))
});
