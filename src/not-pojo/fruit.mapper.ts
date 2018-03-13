import { IFruitBack } from '../service.back';
import { FruitFront } from './fruit.front';

export const fruitMapper = (fruitBack: IFruitBack): FruitFront =>
  new FruitFront(
    fruitBack.id,
    fruitBack.name,
    fruitBack.colorValue
  );
