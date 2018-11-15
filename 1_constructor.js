/**
 *  --------------------------- 3 common ways to create a new empty object: -----------------------------------
 * */

var newObject = {};

var newObject = Object.create(Object.prototype);

var newObject = new Object();

/**
 *  4 ways in which keys and values can then be assigned to an object:
 */

// 1. DOT syntax ****************************************************************
newObject.someKey = "Hello world"; // Set properties
var value = newObject.someKey; // Get properties

// 2. SQUARE BRACKET syntax
newObject["someKey"] = "Hello world"; // Set properties

var value = newObject["someKey"]; // Get properties

// 3. Object.defineProperty ******************************************************

// Set properties
Object.defineProperty(newObject, "someKey", {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true
});

// If the above feels a little difficult to read, a short-hand could
// be written as follows:

var defineProp = function(obj, key, value) {
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  };
  Object.defineProperty(obj, key, config);
};

// To use, we then create a new empty "person" object
var person = Object.create(Object.prototype);

// Populate the object with properties
defineProp(person, "car", "Delorean");
defineProp(person, "dateOfBirth", "1981");
defineProp(person, "hadBeard", false);

console.log(person); // Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}

// 4. Object.defineProperties *************************************************

Object.defineProperties(newObject, {
  someKey: {
    value: "Hello World",
    writable: true
  },
  anotherKey: {
    value: "Foo bar",
    writable: false
  }
});

// Getting properties for 3. and 4. can be done using any of the
// options in 1. and 2.
var valueSomeKey4 = newObject["someKey"];
console.log(valueSomeKey4);

newObject["someKey"] = "writable";
console.log(newObject["someKey"]);

newObject["anotherKey"] = "unwritable";
console.log(newObject["anotherKey"]);
console.log(Object.getOwnPropertyDescriptor(newObject, "someKey"));
/*
{ value: 'writable',
writable: true,
enumerable: true,
configurable: true }
*/

/**
 *  these methods can even be used for inheritance, as follows: (** later in the book**)
 */

// Usage:

// Create a race car driver that inherits from the person object
var driver = Object.create(person);
var assignedDriver = Object.assign({}, person);
console.log(driver);
console.log(`created driver: ${driver}`);
console.log("assigned driver: " + assignedDriver); // https://stackoverflow.com/questions/34838294/what-is-difference-between-creating-object-using-object-create-and-object-assi

// Set some properties for the driver
defineProp(driver, "topSpeed", "100mph");

// Get an inherited property (1981)
console.log("driver's birthday : " + driver.dateOfBirth);

// Get the property we set (100mph)
console.log("driver's top speed : " + driver.topSpeed);

/**
 * BASIC CONSTRUCTORS ***********************************************
 * * prefixing a call to a constructor function with the keyword "new";
 * * inside a constructor, the keyword "this" references the new object that's being created.
 * * Revisiting object creation, a basic constructor may look as follows:
 */

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function() {
    return this.model + " has done " + this.miles + " miles";
  };
}

// Usage:

// We can create new instances of the car
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

// and then open our browser console to view the
// output of the toString() method being called on
// these objects
console.log(civic.toString());
console.log(mondeo.toString());

/**
 * CONSTRUCTORS WITH PROTOTYPES ***********************************************
 * * Functions, like almost all objects in JavaScript, contain a "prototype" object.
 * *
 */
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function() {
  return this.model + " has done " + this.miles + " miles";
};
// a single instance of toString() will now be shared between all of the Car objects.

// Usage:
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
