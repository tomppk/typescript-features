// Classes have three modifies public, private, protected to
// limit access to class properties and methods.
// Public can be called anywhere (default value)
// Private can be called only by methods inside the class
// Protected can be called only by methods inside the class
// and by child classes that extend this class

class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
  }

  private drive(): void {
    console.log('chugga chugga');
  }

  startDriving(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car(4, 'blue');
car.startDriving();
console.log(car.color);
