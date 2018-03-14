import { IFruitBack } from '../service.back';
import { FruitFront } from './fruit.front';

// With "Not-Pojo", we create eager class instance, when mapping the backend service!
export const fruitMapper = (fruitBack: IFruitBack): FruitFront =>
  new FruitFront(
    fruitBack.id,
    fruitBack.name,
    fruitBack.colorValue
  );
