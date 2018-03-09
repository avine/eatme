namespace V1 {
  // Backend data model
  interface FruitBack {
    id: number;
    name: string;
    colorValue: string;
    price: number;
  }

  // Get fruits from Backend service
  function fruitsService(): FruitBack[] {
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

      // We need to extract the instance properties...
      Object.getOwnPropertyNames(this).forEach(
        (prop: string) => clone[prop] = this[prop]
      );

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
    const fruits: FruitFront[] = fruitsService().map(fruitsMapper);

    // Let's try to clone and eat fruits
    console.log('\nMon repas fruité:');
    fruits.forEach(fruit => console.log(fruit.clone().eat()));
  }

  // L(a)unch time!
  Main();
}
