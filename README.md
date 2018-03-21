# pojo-or-not-pojo (that's the question...)

Decoupling the frontend and backend (hexagonal-architecture), using "Plain Old JavaScript Object" versus "Class instance with Behavior".

What is the impact when "immutable" comes into play?


## Definitions

*"Immutable" in this presentation:*

The **store** should expose its data as independent copies to **protect the components from each other**.
Thus, a component can consume and modify this data without side effect on the other components.

*"Immutable" in the Redux world:*

The **component** that exposes its data to the outside by sending them to the store (with reducers), must clone them to **protect itself**.
In this way the other components that retrieve this data from the store as they are, can modify them without side effect for the original component.

## The App

Install dependencies with `npm install`.

Execute `npm run not-pojo` and `npm run pojo` (`npm start` is an alias of `npm run pojo`).

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
        { id: 4, name: 'kiwis', colorValue: 'green', price: 3.35 }
      ]
    }
  ];
}
```

### fruit.front.ts

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

### fruit.mapper.ts

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

### shop.front.ts

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

### shop.mapper.ts

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

### index.ts

Now, hang on a minute.
We are going to explain `shopsServiceFront` in the next section.
For now, assume that it is used as a setter/getter of the frontend shop.

*Not-Pojo:*

```ts
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
```

*Pojo:*

```ts
import { shopsServiceBack } from '../service.back';
import { shopsServiceFront } from './service.front';
import { IShopFront, ShopFront } from './shop.front';
import { shopMapper } from './shop.mapper';

const app = {
  fetch() {
    const shops: IShopFront[] = shopsServiceBack().map(shopMapper);
    shopsServiceFront.set(shops);
    return this; // Enable chaining
  },

  display() {
    // With "Pojo", we create lazy class instance, when behavior is needed.
    shopsServiceFront.get().forEach(shop => new ShopFront(shop).showcase());
  }
}

app.fetch().display();
```

### service.front.ts

So far both solutions are still valid!
But here comes the final piece of the demonstration...

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

## It can even get worse

In this demo application, the backend data was pretty simple.
But what will happen if the model becomes more complex?

*Not-Pojo:*

```typescript
export interface IItemBack {
  dataBack1: any;
  dataBack2: any;
  dataBack3: any;
  dataBack4: any;
  dataBack5: any;
  dataBack6: any;
  dataBack7: any;
  dataBack8: any;
  dataBack9: any;
}

export class ItemFront {
  constructor(
    public dataFront1: any,
    public dataFront2: any,
    public dataFront3: any,
    public dataFront4: any,
    public dataFront5: any,
    public dataFront6: any,
    public dataFront7: any,
    public dataFront8: any,
    public dataFront9: any
  ) {}

  behavior1() { console.log(this.dataFront1); }
  behavior2() { console.log(this.dataFront2); }
}

export const itemMapper = (itemBack: IItemBack) =>
  new ItemFront(
    // Long list of arguments...
    itemBack.dataBack1,
    itemBack.dataBack2,
    itemBack.dataBack3,
    itemBack.dataBack4,
    itemBack.dataBack5,
    itemBack.dataBack6,
    itemBack.dataBack7,
    itemBack.dataBack8,
    itemBack.dataBack9
  );

const cloneItem = (itemFront: ItemFront) => {
  return new ItemFront(
    // Long list of arguments...
    itemFront.dataFront1,
    itemFront.dataFront2,
    itemFront.dataFront3,
    itemFront.dataFront4,
    itemFront.dataFront5,
    itemFront.dataFront6,
    itemFront.dataFront7,
    itemFront.dataFront8,
    itemFront.dataFront9
  );
};
```

Clearly, this code is error prone, because of the long list of functions parameters.

On the other hand, when using pojo we don't get into this pitfall.

*Pojo:*

```typescript
export interface IItemBack {
  dataBack1: any;
  dataBack2: any;
  dataBack3: any;
  dataBack4: any;
  dataBack5: any;
  dataBack6: any;
  dataBack7: any;
  dataBack8: any;
  dataBack9: any;
}

export interface IItemFront {
  dataFront1: any;
  dataFront2: any;
  dataFront3: any;
  dataFront4: any;
  dataFront5: any;
  dataFront6: any;
  dataFront7: any;
  dataFront8: any;
  dataFront9: any;
}

export class ItemFront {
  constructor(public itemFront: IItemFront) {}

  behavior1() { console.log(this.itemFront.dataFront1); }
  behavior2() { console.log(this.itemFront.dataFront2); }
}

export const itemMapper = (itemBack: IItemBack): IItemFront => ({
  // Easy mapping!
  dataFront1: itemBack.dataBack1,
  dataFront2: itemBack.dataBack2,
  dataFront3: itemBack.dataBack3,
  dataFront4: itemBack.dataBack4,
  dataFront5: itemBack.dataBack5,
  dataFront6: itemBack.dataBack6,
  dataFront7: itemBack.dataBack7,
  dataFront8: itemBack.dataBack8,
  dataFront9: itemBack.dataBack9
});

const cloneItem = (itemFront: ItemFront): IItemFront => ({
  // Easy cloning!
  ...itemFront
});
```

## Conclusion

If you do not need hexagonal-architecture or immutability then the "Not-Pojo" solution is the best.
You create instances of the classes eagerly when mapping the backend service.
And you get all the expected behaviors instantly.

But if you need hexagonal-architecture or immutability then the "Pojo" solution is the best.
You can easily map and clone objects when you need it.
And you create instances of the classes lazily when behavior is needed.
