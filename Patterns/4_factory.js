// Eg. VehicleFactory

/**
 * Represents a Car
 * @constructor
 * @param {object} options : { doors, state, color }
 * @property { number } doors
 * @property { string } state
 * @property { string } color
 */
function Car(options) {
  // A constructor for defining cars
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}
/**
 * Represents a Truck
 * @constructor
 * @param { object } options : { state, wheelSize, color }
 * @property { number } doors
 * @property { string } wheelSize
 * @property { string } color
 */
function Truck(options) {
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}

// FactoryExample.js

/**
 *
 */
function VehicleFactory() {} // Define a skeleton vehicle factory

// Define the prototypes and utilities for this factory

VehicleFactory.prototype.vehicleConstructor = Car; // Our default vehicleClass is Car. Same name as the constructor defined before.

/**
 * VehicleFactory.prototype method createVehicle()
 * @param { object } options : options.vehicleType
 * @returns { Car || Truck } : new instance of this.vehicleConstructor at given options.vehicleType property value.
 */
VehicleFactory.prototype.createVehicle = function(options) {
  switch (options.vehicleType) {
    case "car":
      this.vehicleConstructor = Car; // update value but doesn't return anything yet. if there was a return I could not have used the break; statement.
      break;
    case "truck":
      this.vehicleConstructor = Truck;
      break;
    //defaults to VehicleFactory.prototype.vehicleClass (Car)
  }
  return new this.vehicleConstructor(options);
};

// ??? Why instantiate carFactory? Couldn't we use VehicleFactory.prototype.createVehicle ??? // Output: true :).
// below 3 different ways to call the createVehicle() method of VehicleFactory.protorype.
// Create an instance of our factory that makes cars (props like "vehicleConstructor" and methods like "createVehicle()" are  )
var carFactory = new VehicleFactory();

// 1) use the instantiated carFactory's createVehicle method
var car2 = carFactory.createVehicle({
  vehicleType: "car",
  color: "white",
  doors: 1
});

// 2) intantiate the new factory right when calling the method (so you dont have to get into the prototype.)
var truck = new VehicleFactory().createVehicle({
  vehicleType: "truck",
  state: "new",
  color: "pink",
  wheelSize: "XXL"
});

// 3) Don't use the instantiated carFactory but call the original ones prototype method.
var car1 = VehicleFactory.prototype.createVehicle({
  vehicleType: "car",
  color: "yellow",
  doors: 6
});

// Test to confirm our car was created using the vehicleConstructor/prototype Car

// Outputs: true
console.log(car1 instanceof Car);
console.log(car2 instanceof Car);
console.log(truck instanceof Truck);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car1);
console.log(car2);
console.log(truck);

// ------- Approach #1: Modify a VehicleFactory instance to use the Truck class -------

var movingTruck = carFactory.createVehicle({
  vehicleType: "truck",
  state: "like new",
  color: "red",
  wheelSize: "small"
});

// Test to confirm our truck was created with the vehicleConstructor/prototype Truck
console.log(movingTruck instanceof Truck); // Outputs: true

console.log(movingTruck); // Outputs: Truck { color: "red", state: "like new", wheelSize: "small" }

// ------ Approach #2: SubConstructor VehicleFactory to create a factory Constructor that builds Trucks -------

function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleConstructor = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
  state: "omg..so bad.",
  color: "pink",
  wheelSize: "so big"
});

// Confirms that myBigTruck was created with the prototype Truck
console.log(myBigTruck instanceof Truck); // Outputs: true

console.log(myBigTruck); // Outputs:  Truck { color: "pink", state: "omg..so bad.", wheelSize: "so big" }
