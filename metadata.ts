// Adds a new global object Reflect
import 'reflect-metadata';

// Metadata is kind of like a pointer property attached to an object
// that is a reference to a metadata object that describes some special
// stuff about the first object

const plane = {
  color: 'red',
};

// Can think like behind the scenes adding a new property of note: 'hi there'
// to plane object. Is never going to show up in debugger etc. is essentially
// an invisible property
// First argument is key or name of property
// Second is value of property
// Third is the object we want to attach the metadata to
Reflect.defineMetadata('note', 'hi there', plane);
Reflect.defineMetadata('height', 10, plane);

// Retrieve metadata from object
// First argument key or name of property
// Second the object we want to retrieve it from
const note = Reflect.getMetadata('note', plane);
const height = Reflect.getMetadata('height', plane);

console.log(note);
console.log(height);

// Can also add metadata to object property itself
// Fourth argument is the name of the property we want to attach metadata to
Reflect.defineMetadata('hint', 'bye there', plane, 'color');

// Retrieve metadata from object property
// Third argument is the name of property
const hint = Reflect.getMetadata('hint', plane, 'color');

console.log(hint);

// Metadata with class and decorators
@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('This is a secret hi there')
  fly(): void {
    console.log('vrrrrr');
  }
}

// Decorator factory. A normal function that returns a decorator function.
// Decorator function that attaches metadata to class property
// Look at the fly() method or property at Plane prototype and define
// some metadata to that property
function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

// Retrieve metadata with key 'secret' from class Plane prototype with class
// or prototype property named 'fly'
const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');

console.log(secret);

// target: typeof Plane is a reference to the constructor function of Plane class
// Iterate through all the keys of the Plane prototype. Here key refers to
// fly() property. Get metadata with key secret associated with Plane prototype
// keys so the fly() property
function printMetadata(target: typeof Plane) {
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret);
  }
}
