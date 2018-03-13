import { IFruitBack } from '../service.back';
import { IFruitFront } from './fruit.front';

export const fruitMapper = (fruitBack: IFruitBack): IFruitFront => ({
  id: fruitBack.id, 
  name: fruitBack.name, 
  color: fruitBack.colorValue 
});
