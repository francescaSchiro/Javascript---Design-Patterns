(dfasdf)

## Learning JavaScript Design Patterns

A [book](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) by Addy Osmani.

Practice of the **JavaScript Design Patterns**

> - Run any file from your terminal with the command: `node *filename.js*`

---

# 1. The Constructor Pattern

1_constructor.js

> a "blueprint" for creating many objects of the same "type".

- **CONSTRUCTOR (VS regular functions)**
  - prefixing a call to a constructor function with the keyword "**new**";
  - By convention, CONSTRUCTOR function names start with CAPITAL LETTERS;
  - inside a constructor function, you may see properties being set using "this";
  - you may also see methods being created using "this" and anonymous functions;
  - a constructor wont return anything

**Eg.**

```javascript
function MyObj(a) {
  //just describing this obj in constructor
  this.prop1 = a;
}

MyObj.prototype.incr = function() {
  return (this.prop1 = this.prop1 + 1);
};
MyObj.prototype.decr = function() {
  return (this.prop1 = this.prop1 - 1);
};

var obj1 = new MyObj(1); // create instance starting from MyObj
var obj2 = new MyObj(20);
var obj3 = new MyObj(234);
var obj4 = new MyObj(44);

obj1.incr = function() {
  return (this.prop1 = this.prop1 + 5);
};
```

---

# 2. The Module Pattern

_2_module.js_

> encapsulates "privacy", state and organization using closures. It provides a way of wrapping a mix of public and private methods and variables, protecting pieces from leaking into the global scope and accidentally colliding with another developer's interface.

- With this pattern, only a public API is returned, keeping everything else within the closure private.
- This gives us a clean solution for shielding logic.
- The pattern utilizes an immediately-invoked function expression (IIFE )
- Within the Module pattern, **variables or methods declared** are **only available inside the module itself thanks to closure**. Variables or methods defined **within the returning object** however are available **to everyone**.

**Eg.**

```javascript
var testModule = (function() {
  var counter = 0;
  return {
    incrementCounter: function() {
      return counter++;
    },
    resetCounter: function() {
      console.log("counter value prior to reset: " + counter);
      counter = 0;
    }
  };
})();

testModule.incrementCounter();
```

---

# 3. The Revaling Module Pattern

_3_revealingModule.js_

A slightly improved version of the Module Pattern.
An updated pattern where we would simply **define all of our functions and variables in the private scope**
and return an anonymous object with pointers to the private functionality we wished to reveal as public

**Eg.**

```javascript
var myRevealingModule = (function() {
  var privateVar = "Ben Cherry",
    publicVar = "HeyThere!";
  function privateFunction() {
    console.log("Name: " + privateVar);
  }
  function publicSetName(strName) {
    privateVar = strName;
  }
  function publicGetName() {
    privateFunction();
  }
  return {
    setName: publicSetName,
    greetings: publicVar,
    getName: publicGetName
  };
})();
```

---

# _EXERCISE with Constructor and RevealingModule Pattern_

_1_PanelsExercise/index.js_

- Create 5+ Panels;

Each Panel should have:

- These PROPERTIES:
  - **id**: _string_, [guid](https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript)
  - **label**: _string_,
  - **value**: _number_,
  - **selected**: _boolean_,
- These METHODS:

  - **increment**: function() { _return_ value = value + 1 },
  - function **decrement** () { _return_ value = value - 1 },
  - function **getTitle** ( label, value ) { _return_ `${label}(${value})`}

- **Special Cases:**

  - if ( **value > 50** ) { increment: function() { _return_ value = value + **5** }};
  - if Panel is selected (Panel.selected === true) change _background-color_;

- **Methods to implement** (C R U D: _**C**reate, **R**ead, **U**pdate, **D**elete_)

  - **C** : Create. Add a Panel to the Panels [ *array* ], given(at least) a (label, value);
  - **R** : Read. getOne(by id) or All Panels from the Panels [ *array* ];
  - **U** : Update. Override value of a Panel.
  - **D** : Delete. Remove the selected Panel from the Array ( when Panel id is the same as the one selected Panels[ i ] remove from array );

- Folders orginized so that I have:
  - constructor of the obj `Panel` in _models/Panel.js_
    ( where I describe the obj Panel I'm going to instantiate with _new_ in my module method `addPanel()` )
  - `panelsModule` to collect all my actions involving the panels (_panels.module.js_) ;
  - a file of _utils/generic.js_ to keep all my useful functions (in this case just `guid()`);
  - instructions to test in my _index.js_ ;
    **NOTICE** this exercise doesn't have any transpiler to read ES6. so to export/import between files I had to use these 2 lines in order to be able to run it with _node.js_:
  ```javascript
  module.exports = Panel; // to export
  const Panel = require("./models/Panel"); //to import
  ```

---

# 4. The Factory Pattern

_4_factory.js_

(another) Creational pattern concerned with the notion of creating objects but it _doesn't explicitly require_ us to use **a constructor**.
**Instead**: Factory can provide a generic interface for creating objects, where we can specify _the type of factory object_ we wish to be created.

- **Step 2**: create _Constructors_ (like `Car` and `Truck`)

```javascript
function Car(options) {
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}
```

- **Step 2**: create the factory function:

```javascript
function vehicleFactory() {}
```

- **Step 3**: "attatch" prop(filter that's going to tell the factory which type to render) and method to the `VehicleFactory.prototype` create the new instance of the `Car` or `Truck` constructor with the given _options_

```javascript
// prop
VehicleFactory.prototype.vehicleConstructor = Car;

// method
VehicleFactory.prototype.createVehicle = function(options) {
  switch (options.vehicleType) {
    case "car":
      this.vehicleConstructor = Car;
      break;
    case "truck":
      this.vehicleConstructor = Truck;
      break;
  }
  return new this.vehicleConstructor(options);
};
```

- **Step 4**: create an instance of the `VehicleFactory` (so you don't have to go into prototype everytime when calling the `createVehicle()` method)

```javascript
var carFactory = new VehicleFactory();
```

- **Step 5**: use the instantiated carFactory's `createVehicle()` method to create a new instantiated object with given options.

```javascript
var car2 = carFactory.createVehicle({
  vehicleType: "car",
  color: "white",
  doors: 1
});
```
- **Step 6**: check if our car was created using the vehicleConstructor Car
```javascript
console.log(car1 instanceof Car); // true 
```
--- 

# 4.2 The Abstract Factory Pattern

_4.2_abstractFactory.js_

It aims to _encapsulate a group of individual factories_ with a common goal. 
It should be used _where a system must be independent_ from the way the objects it creates are generated or it needs _to work with multiple types of objects_.

**LOOK BETTER and define better**

---

# 5. The Singleton Pattern

_5_singleton.js_

It restricts *instantiation* of a class to a _single object_. 
Singletons differ from static classes (or objects) as _we can delay their initialization_.
It is neither the object or "class" that's _returned_ by a Singleton, it's _a structure_.
> *Think of how closured variables aren't actually closures - the function scope that provides the closure is the closure.*
What makes the Singleton is the **global access to the instance** (generally through `MySingleton.getInstance()`) as we don't (at least in static languages) call new MySingleton() directly
- The applicability of the _Singleton pattern_ is described as follows:
  - There must be exactly **one instance of a class**, and it must be accessible to clients from a well-known access point.
  - When the sole instance **should be extensible by subclassing**, and clients should be able to use an extended instance without modifying their code.
  ```javascript
  mySingleton.getInstance = function(){
  if ( this._instance == null ) {
    if ( isFoo() ) {
       this._instance = new FooSingleton();
    } else {
       this._instance = new BasicSingleton();
    }
  }
  return this._instance;
};
Here,` getInstance` becomes a little like a _Factory method_ and we don't need to update each point in our code accessing it. `FooSingleton` above would be a subclass of `BasicSingleton` and implement the same interface.
  
  ```
