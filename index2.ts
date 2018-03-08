namespace V2 {
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
}
