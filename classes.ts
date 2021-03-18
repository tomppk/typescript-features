// Classes have three modifies public, private, protected to
// limit access to class properties and methods.
// Public can be called anywhere (default value)
// Private can be called only by methods inside the class
// Protected can be called only by methods inside the class
// and by child classes that extend this class

class Vehicle {
  protected honk(): void {
    console.log('beep');
  }
}

class Car extends Vehicle {
  private drive(): void {
    console.log('chugga chugga');
  }

  startDriving(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car();
car.startDriving();
car.honk();
