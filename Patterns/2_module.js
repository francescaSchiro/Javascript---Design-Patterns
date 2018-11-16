// * Object Literals: an object is described as a set of comma-separated name/value pairs enclosed in curly braces ({}).
// Eg.

var myObjectLiteral = {
  variableKey: "variableValue",

  functionKey: function() {
    // ...
  }
};
// Outside of an object, new members may be added to it using assignment as follows myModule.property = "someValue";
myObjectLiteral.variableKey = "someOtherValue";

// ----------------------------------------------------------------

// Below example of a module defined using object literal notation:

var myModule = {
  myProperty: "someValue",

  // object literals can contain properties and methods.
  // e.g we can define a further object for module configuration:
  myConfig: {
    useCaching: true,
    language: "en"
  },

  // a very basic method
  saySomething: function() {
    console.log("Where in the world is Carmen San Diego?");
  },

  // output a value based on the current configuration
  reportMyConfig: function() {
    console.log(
      "Caching is: " + (this.myConfig.useCaching ? "enabled" : "disabled")
    );
  },

  // override the current configuration
  updateMyConfig: function(newConfig) {
    if (typeof newConfig === "object") {
      this.myConfig = newConfig;
      console.log(this.myConfig.language);
    }
  }
};

// --- OUTPUTS: ---

// Where in the world is Carmen San Diego?
myModule.saySomething();

// Caching is: enabled

myModule.reportMyConfig();

// fr
myModule.updateMyConfig({
  language: "fr",
  useCaching: false
});

// Caching is: disabled
myModule.reportMyConfig();

// ------------------------------------------------------------------------------------------------
// THE MODULE PATTERN

// Eg. : implementation of the Module Pattern by creating a MODULE which is SELF CONTAINED.

var testModule = (function() {
  var counter = 0; // The counter variable is actually fully shielded from our global scope so it acts just like a private variable would - its existence is limited to within the module's closure so that the only code able to access its scope are our two functions.
  return {
    incrementCounter: function() {
      // other parts of the code are unable to directly read the value of our incrementCounter() or resetCounter()
      return counter++;
    },
    resetCounter: function() {
      console.log("counter value prior to reset: " + counter);
      counter = 0;
    }
  };
})();

// Usage: increment our counter
testModule.incrementCounter();

// Check the counter value and reset
testModule.resetCounter(); // counter value prior to reset: 1

// -----------------------------------------------------------------------------------------
// define a simple template that we use for getting started with it.
// Here's one that covers namespacing, public and private variables:

var myNamespace = (function() {
  var myPrivateVar, myPrivateMethod;

  // A private counter variable
  myPrivateVar = 0;

  //a private function which logs any arguments
  myPrivateMethod = function(foo) {
    console.log(foo);
  };
  return {
    // A public variable
    myPublicVar: "foo",
    // A public function utilizing privates
    myPublicFunction: function(bar) {
      // Increment our private counter
      myPrivateVar++;
      // Call our private method using bar
      myPrivateMethod(bar);
    }
  };
})();

// ex. a shopping basket implemented using this pattern.
// The module itself is completely self-contained in a global variable called "basketModule".
//The "basket" array only exists with the module's closure and so the only methods able to access it are those with access to its scope (i.e. addItem(), getItemCount() etc).

var basketModule = (function() {
  // privates
  var basket = [];

  function doSomethingPrivate() {
    //...
  }

  function doSomethingElsePrivate() {
    //...
  }

  // Return an object exposed to the public
  return {
    // Add items to our basket
    addItem: function(values) {
      basket.push(values);
    },
    getItemCount: function() {
      return basket.length;
    },

    // Public alias to a private function
    doSomething: doSomethingPrivate,

    // Get the total value of items in the basket
    getTotal: function() {
      var q = this.getItemCount(), //  with the comma is implicit var p below
        p = 0;
      while (q--) {
        p += basket[q].price; // same as p = p + basket[q].price
      }
      return p;
    }
  };
})();

// basketModule returns an object with a public API we can use
basketModule.addItem({
    item: "bread",
    price: 0.5
  });
   
  basketModule.addItem({
    item: "butter",
    price: 0.3
  });

  console.log( basketModule.getItemCount()); // 2
  console.log( basketModule.getTotal()); // 0.8
  
  // However, these following will not work:
  console.log( basketModule.basket ); // undefined.  basket itself is not exposed as a part of our public API
//   console.log( basket ); // doesn't even work. it only exists within the scope of our
  // basketModule closure, but not in the returned public object
