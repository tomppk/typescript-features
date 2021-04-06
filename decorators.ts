@classDecorator
class Motorcycle {
  @testDecorator
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This motorcycles color is ${this.color}`;
  }

  @logError('Oops, something unexpected happened')
  ride(
    @parameterDecorator speed: string,
    @parameterDecorator tireSize: number
  ): void {
    if (speed === 'fast') {
      console.log('swhosh');
    } else {
      console.log('nothing');
    }
    throw new Error();
    console.log('vroom');
  }
}

// Decorator that refers to a constructor function of a class.
// Only one argument constructor
function classDecorator(constructor: typeof Motorcycle) {
  console.log(constructor);
}

// Refers to parameters or arguments of a method
// Target is the prototype of the class
// Key is the name of the method
// Index is the index of parameter/argument we are referring to
// When we want the decorator to refer to a method parameter or argument
// we place it inside the method arguments parenthesis like above at ride()
function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

// Decorator cannot get access to instance variable values eg. color: 'red'
// This is because first argument is the prototype of the object and prototypes
// do not have instance variable values and decorators are applied when the
// prototype of the class is created so before any instance of class is created
function testDecorator(target: any, key: string) {
  console.log(key);
}

// First argument is the prototype of the object
// Second argument is the key of the property/method/accessor on the object
// Third argument is the property descriptor which is an object that is
// meant to describe a property on an other object
// Decorators are applied when the code for this class is run
// (not when an instance is created)

// Decorator factory. Used anytime we want to configure/customize a decorator so
// that it takes in arguments.
// Wrapping the actual decorator inside a function and
// returning the actual decorator.
// Just a normal function that returns a decorator function
function logError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    // Method is a reference to this.ride() as @logError is used above ride()
    const method = desc.value;

    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}
