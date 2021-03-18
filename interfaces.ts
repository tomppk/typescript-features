// Interface sets rules for a custom type
// summary(): string means that a type Vehicle must have
// a function called summary with no arguments, that returns
// a string.
interface Reportable {
  //   name: string;
  //   year: Date;
  //   broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  },
};

// The object passed in to this function must meet the type
// requirements of Vehicle type object. (it must satisfy the
// Vehicle interface) ie. it must have
// same properties and types as Vehicle type object
// (name: string, year: number, broken: boolean)
const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink);
