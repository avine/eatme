# eatme

Decoupling the frontend from backend

## Code V1

```typescript
// Backend data model
interface FruitBack {
  id: number;
  name: string;
  colorValue: string;
  price: number;
}

// Get fruits from Backend service
function httpGetFruits(): FruitBack[] {
  return [
    { id: 1, name: 'pomme', colorValue: 'verte', price: 2.25 }, 
    { id: 2, name: 'pomme', colorValue: 'rouge', price: 3.15 }, 
    { id: 3, name: 'poire', colorValue: 'jaune', price: 1.05 }
  ];
}

// Frontend object domain
class FruitFront {
  id: number;
  name: string;
  color: string; // In our Frontend, "colorValue" is named "color"
  // price: number; // Assuming our Frontend don't need to consume the price

  // Hum... We need some behavior, side by side with the instances properties :(
  eat() {
    return `- Je mange une ${this.name} ${this.color}.`;
  }

  // Hum... Hard to clone :(
  clone() {
    const clone = new FruitFront();
    clone.id = this.id;
    clone.name = this.name;
    clone.color = this.color;
    return clone;
  }
}

// Map FruitBack object to FruitFront instance
function fruitsMapper(fruitBack: FruitBack) {
  const fruitFront = new FruitFront();

  fruitFront.id = fruitBack.id;
  fruitFront.name = fruitBack.name;
  fruitFront.color = fruitBack.colorValue;

  return fruitFront;
}

// Main program that consumes the Backend
function Main() {
  const fruits: FruitFront[] = httpGetFruits().map(fruitsMapper);

  console.log('\nMon repas fruité:');
  fruits.forEach(fruit => console.log(fruit.eat()));
}

// L(a)unch time!
Main();
```

## Code V2

```typescript
// Backend data model
interface FruitBack {
  id: number;
  name: string;
  colorValue: string;
  price: number;
}

// Get fruits from Backend service
function httpGetFruits(): FruitBack[] {
  return [
    { id: 1, name: 'pomme', colorValue: 'verte', price: 2.25 }, 
    { id: 2, name: 'pomme', colorValue: 'rouge', price: 3.15 }, 
    { id: 3, name: 'poire', colorValue: 'jaune', price: 1.05 }
  ];
}

// Frontend data model
interface FruitFront {
  id: number;
  name: string;
  color: string; // In our Frontend, "colorValue" is named "color"
  // price: number; // Assuming our Frontend don't need to consume the price
}

// Frontend object domain
class Fruit {
  constructor(public fruit: FruitFront) {}

  // Behavior defined in Fruit (not in FruitFront) :)
  eat() {
    return `- Je mange une ${this.fruit.name} ${this.fruit.color}.`;
  }

  // Easy to clone :)
  clone() {
    return new Fruit({ ...this.fruit });
  }
}

// Map FruitBack object to FruitFront instance
const fruitsMapper = (fruitBack: FruitBack) => 
  new Fruit({ 
    id: fruitBack.id, 
    name: fruitBack.name, 
    color: fruitBack.colorValue 
  });

// Main program that consumes the Backend
function Main() {
  const fruits: Fruit[] = httpGetFruits().map(fruitsMapper);

  console.log('\nMon repas fruité:');
  fruits.forEach(fruit => console.log(fruit.eat()));
}

// L(a)unch time!
Main();
```

## Run

(install dependencies with `npm i`)

*Terminal output:*

```txt
$ npm start

Mon repas fruité:
- Je mange une pomme verte.
- Je mange une pomme rouge.
- Je mange une poire jaune.
```
