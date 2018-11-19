const utils = require('./../utils/generic');

// Create Panel constructor:
// Described the reference for all the new Instances I'm going to create.
// Define Properties(in Panel function) and methods(in prototype-> they're the same for all obj unless I override them)

/**
 * @constructor
 * @param { string } label
 * @param { number } value
 * @param { string } id
 * @property { boolean } selected
 */
function Panel(label, value, id = utils.guid()) { // if I don't pass id generates a unique one.
  this.id = id;
  this.label = label;
  this.value = value;
  this.selected = false;
}

/**
 * Increment the value
 * @returns { number }
 */
Panel.prototype.increment = function () {
  return this.value > 50
    ? (this.value = this.value + 5)
    : (this.value = this.value + 1);
};

/**
 * Decrement the value
 * @return { boolean }
 */
Panel.prototype.decrement = function () {
  return (this.value = this.value - 1);
};

module.exports = Panel;