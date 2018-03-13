# pojo-or-not-pojo (that's the question...)

Decoupling the frontend from backend, using "Plain Old JavaScript Object" VS "Class and Behavior".

## Run

Install dependencies with `npm i`.

Next, execute `npm run not-pojo` or `npm start` (which is an alias of `npm run pojo`).

```txt
$ npm start

At "Super Fruit", you will find:
- some green apples.
- some red apples.

At "Fruit Mania", you will find:
- some yellow pears.
- some green kiwis.
```

## Code

### service.back.ts

```ts
export interface IFruitBack {
  id: number;
  name: string;
  colorValue: string;
  price: number;
}

export interface IShopBack {
  id: number;
  name: string;
  fruits: IFruitBack[];
}

export function shopsServiceBack(): IShopBack[] {
  return [
    {
      id: 1,
      name: 'Super Fruit',
      fruits: [
        { id: 1, name: 'apples', colorValue: 'green', price: 2.25 },
        { id: 2, name: 'apples', colorValue: 'red', price: 3.15 }
      ]
    },
    {
      id: 2,
      name: 'Fruit Mania',
      fruits: [
        { id: 3, name: 'pears', colorValue: 'yellow', price: 1.05 },
        { id: 3, name: 'kiwis', colorValue: 'green', price: 3.35 }
      ]
    }
  ];
}
```

## fruit.front.ts

*Pojo:*

```ts
export interface IFruitFront {
  id: number;
  name: string;
  color: string; // In our Frontend, "colorValue" is named "color"
  // price: number; // Assuming our Frontend don't need to consume the price
}

export class FruitFront {
  constructor(public fruit: IFruitFront) {}

  description() {
    return `- some ${this.fruit.color} ${this.fruit.name}.`;
  }
}
```

*Not-Pojo:*

```ts
export class FruitFront {
  constructor(
    public id: number,
    public name: string,
    public color: string // In our Frontend, "colorValue" is named "color"
    // price: number // Assuming our Frontend don't need to consume the price
  ) {}

  description() {
    return `- some ${this.color} ${this.name}.`;
  }
}
```

## fruit.mapper.ts

*Pojo:*

```ts
import { IFruitBack } from '../service.back';
import { IFruitFront } from './fruit.front';

export const fruitMapper = (fruitBack: IFruitBack): IFruitFront => ({
  id: fruitBack.id, 
  name: fruitBack.name, 
  color: fruitBack.colorValue 
});

```

*Not-Pojo:*

```ts
import { IFruitBack } from '../service.back';
import { FruitFront } from './fruit.front';

export const fruitMapper = (fruitBack: IFruitBack): FruitFront => 
  new FruitFront(
    fruitBack.id,
    fruitBack.name,
    fruitBack.colorValue
  );
```

## shop.front.ts

*Pojo:*

```ts
import { FruitFront, IFruitFront } from './fruit.front';

export interface IShopFront {
  id: number;
  name: string;
  fruits: IFruitFront[];
}

export class ShopFront {
  constructor(public shop: IShopFront) {}

  showcase() {
    console.log(`\nAt "${this.shop.name}", you will find:`);
    this.shop.fruits.forEach(fruit => {
      console.log(new FruitFront(fruit).description());
    })
  }
}
```

*Not-Pojo:*

```ts
import { FruitFront } from './fruit.front';

export class ShopFront {
  constructor(
    public id: number,
    public name: string,
    public fruits: FruitFront[]
  ) {}

  showcase() {
    console.log(`\nAt "${this.name}", you will find:`);
    this.fruits.forEach(fruit => {
      console.log(fruit.description());
    })
  }
}
```

## shop.mapper.ts

*Pojo:*

```ts
import { IShopBack } from '../service.back';
import { fruitMapper } from './fruit.mapper';
import { IShopFront } from './shop.front';

export const shopMapper = (shopBack: IShopBack): IShopFront => ({
  id: shopBack.id,
  name: shopBack.name, 
  fruits: shopBack.fruits.map(fruitBack => fruitMapper(fruitBack))
});
```

*Not-Pojo:*

```ts
import { IShopBack } from '../service.back';
import { fruitMapper } from './fruit.mapper';
import { ShopFront } from './shop.front';

export const shopMapper = (shopBack: IShopBack): ShopFront =>
  new ShopFront(
    shopBack.id,
    shopBack.name, 
    shopBack.fruits.map(fruitBack => fruitMapper(fruitBack))
  );
```

## service.front.ts

*Pojo:*

```ts
import { IShopFront } from './shop.front';

const cloneShop = (shop: IShopFront): IShopFront => {
  const fruits = shop.fruits.map(
      fruit => ({ ...fruit })
    );
    return { ...shop, fruits };
  };

let store: IShopFront[] = [];

export const shopsServiceFront = {
  set(_store: IShopFront[]) {
    store = _store;
  },
  get() {
    return store.map(cloneShop);
  }
};
```

*Not-Pojo:*

```ts
import { FruitFront } from './fruit.front';
import { ShopFront } from './shop.front';

const cloneShop = (shop: ShopFront) => {
  const fruits = shop.fruits.map(
    fruit => new FruitFront(fruit.id, fruit.name, fruit.color)
  );
  return new ShopFront(shop.id, shop.name, fruits);
};

let store: ShopFront[] = [];

export const shopsServiceFront = {
  set(_store: ShopFront[]) {
    store = _store;
  },
  get() {
    return store.map(cloneShop);
  }
};
```

## index.ts

*Pojo:*

```ts
import { shopsServiceBack } from '../service.back';
import { shopsServiceFront } from './service.front';
import { IShopFront, ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const shops: IShopFront[] = shopsServiceBack().map(shopMapper);
shopsServiceFront.set(shops);

shopsServiceFront.get().forEach(shop => new ShopFront(shop).showcase());

```

*Not-Pojo:*

```ts
import { shopsServiceBack } from '../service.back';
import { shopsServiceFront } from './service.front';
import { ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const shops: ShopFront[] = shopsServiceBack().map(shopMapper);
shopsServiceFront.set(shops);

shopsServiceFront.get().forEach(shop => shop.showcase());
```
