'use strict';
// Exercises with Constructor and Prototype

function MyObj(a) {
  this.prop1 = a;
}
MyObj.prototype.incr = function() {
  return (this.prop1 = this.prop1 + 1);
};
MyObj.prototype.decr = function() {
  return (this.prop1 = this.prop1 - 1);
};

var obj1 = new MyObj(1);
var obj2 = new MyObj(20);
var obj3 = new MyObj(234);
var obj4 = new MyObj(44);

obj1.incr = function() {
  return (this.prop1 = this.prop1 + 5);
};

console.log(obj1.incr()); // 6
console.log(obj2.incr()); // 21
console.log(obj3.incr()); // 235
console.log(obj4.incr()); // 45

obj3.__proto__.incr = function() {
  return (this.prop1 = "");
};

console.log(obj1.incr()); // 11
console.log(obj2.incr()); // ""
console.log(obj3.incr()); // ""
console.log(obj4.incr()); // ""

console.log(obj1.incr === obj2.__proto__.incr); // false
console.log(obj1.incr === obj1.__proto__.incr); // false
console.log(obj1.__proto__.incr === obj4.__proto__.incr); // true
console.log(obj2.__proto__.incr === obj3.__proto__.incr); // true
