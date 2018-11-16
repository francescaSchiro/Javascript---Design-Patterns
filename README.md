(dfasdf)

## Learning JavaScript Design Patterns

_A (book)[https://addyosmani.com/resources/essentialjsdesignpatterns/book/] by Addy Osmani_

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

## EXERCISE with Constructor and RevealingModule Pattern

_1_PanelsExercise/panels.js_

- Create 5+ Panels;

Each Panel should have:

- These PROPERTIES:
  - **id**: _string_, (guid)[https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript]
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

  ***
