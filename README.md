# pojo-or-not-pojo (that's the question...)

Decoupling the frontend and backend, using "Plain Old JavaScript Object" versus "Class instance with Behavior".

What is the impact when "immutable" comes into play?

## The App

Install dependencies with `npm i`.

Execute `npm run not-pojo` or `npm start` (which is an alias of `npm run pojo`).

```txt
$ npm start

At "Super Fruit", you will find:
- some green apples.
- some red apples.

At "Fruit Mania", you will find:
- some yellow pears.
- some green kiwis.
```

## The Code

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

## fruit.mapper.ts

*Not-Pojo:*

```ts
import { IFruitBack } from '../service.back';
import { FruitFront } from './fruit.front';

// With "Not-Pojo", we create eager class instance, when mapping the backend service!
export const fruitMapper = (fruitBack: IFruitBack): FruitFront =>
  new FruitFront(
    fruitBack.id,
    fruitBack.name,
    fruitBack.colorValue
  );
```

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

## shop.front.ts

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
      // With "Pojo", we create lazy class instance, when behavior is needed.
      console.log(new FruitFront(fruit).description());
    })
  }
}
```

## shop.mapper.ts

*Not-Pojo:*

```ts
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
```

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

## index.ts

Now, hang on a minute.
We are going to explain `shopsServiceFront` in the next section.
For now, assume that it is used as a setter/getter of the front shop.

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

*Pojo:*

```ts
import { shopsServiceBack } from '../service.back';
import { shopsServiceFront } from './service.front';
import { IShopFront, ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const shops: IShopFront[] = shopsServiceBack().map(shopMapper);
shopsServiceFront.set(shops);

// With "Pojo", we create lazy class instance, when behavior is needed.
shopsServiceFront.get().forEach(shop => new ShopFront(shop).showcase());
```

## service.front.ts

Here comes the final piece of the demonstration...

*Not-Pojo:*

```ts
import { FruitFront } from './fruit.front';
import { ShopFront } from './shop.front';

// Oups! Shop is hard to clone.
// With "Not-Pojo", we need to create instances of the classes again!
const cloneShop = (shop: ShopFront) => {
  const fruits = shop.fruits.map(
    fruit => new FruitFront(fruit.id, fruit.name, fruit.color)
  );
  return new ShopFront(shop.id, shop.name, fruits);
};

// Frontend shop store
let store: ShopFront[] = [];

export const shopsServiceFront = {
  set(_store: ShopFront[]) {
    store = _store;
  },
  get() {
    // Always return a clone for immutability
    return store.map(cloneShop);
  }
};
```

*Pojo:*

```ts
import { IShopFront } from './shop.front';

// With "Pojo", we just need to clone "Pojo" objects!
const cloneShop = (shop: IShopFront): IShopFront => {
  const fruits = shop.fruits.map(
      fruit => ({ ...fruit })
    );
    return { ...shop, fruits };
  };

// Frontend shop store
let store: IShopFront[] = [];

export const shopsServiceFront = {
  set(_store: IShopFront[]) {
    store = _store;
  },
  get() {
    // Always return a clone for immutability
    return store.map(cloneShop);
  }
};
```

## Conclusion

If you do not need immutability then the "Not-Pojo" solution is the best.
You create instances of the classes eagerly when mapping the backend service.
And you get all expected behaviors instantly.

But if you need immutability then the "Pojo" solution is the best.
You can easily get cloned objects from the store when you need them.
And you create instances of the classes lazily when behavior is needed.
