/**
 * Generates Unique Id
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

// Create Panel counstructor:
// Described the reference for all the new Instances I'm going to create.
// Define Properties(in Panel function) and methods(in prototype-> they're the same for all obj unless I override them)

/**
 * Panel CONSTRUCTOR
 * @param { string } label
 * @param { number } value
 */
function Panel(label, value, id = guid()) {
  this.id = id; // string
  this.label = label; // string
  this.value = value; // number
  this.selected = false; // boolean
}
/**
 * Panel Protorype METHODS
 */
Panel.prototype.increment = function() {
  return this.value > 50
    ? (this.value = this.value + 5)
    : (this.value = this.value + 1);
};

Panel.prototype.decrement = function() {
  return (this.value = this.value - 1);
};

var pan1 = panelsBoardActions.addPanel("first", 10);
var pan2 = panelsBoardActions.addPanel("second", 20);
var pan3 = panelsBoardActions.addPanel("third", 30, "05638cb6-5ae2-86f5-a847-cbafa91abd1a"); // just to test getPanelById
var pan4 = panelsBoardActions.addPanel("fourth", 40);
var pan5 = panelsBoardActions.addPanel("fifth", 50);
var pan6 = panelsBoardActions.addPanel("sixth", 60);

console.log(pan1);
console.log(pan2);
console.log(pan6);

console.log(pan6.increment());

// Create a Board that manages all Panels

var panelsBoardActions = (function() {
  // All of my created instances from the Panel counstructor
  var panels = [pan1, pan2, pan3, pan4, pan5, pan6];

  /**
   *
   * @param { string } label
   * @param { number } value
   */
  function addPanel(label, value, id) {
    var newPan = new Panel(label, value);
    panels.push(newPan);
  }
  /**
   *
   * @param { string } id
   */
  function getPanelById(id) {
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      if (id === panel.id) {
        return panel;
      }
    }
  }

  function getAllPanels() {
    return panels;
  }
  /**
   *
   * @param { object } panel
   * @param { number } value
   */
  function updatePanelValue(panel, value) {
    panel.value = value;
    return panel;
  }
  /**
   *
   * @param { object } panel
   */
  function deletePanel(panel) {
    var indexOfPanelToRemove = panels.indexOf(panel);
    if (indexOfPanelToRemove !== -1) {
      panels.splice(indexOfPanelToRemove, 1);
    } else {
      console.log("panel not found");
    }
  }

  return {
    addPanel: addPanel,
    getPanelById: getPanelById,
    getAllPanels: getAllPanels,
    updatePanelValue: updatePanelValue,
    deletePanel: deletePanel
  };
})();

const myPanels = panelsBoardActions.getAllPanels();

panelsBoardActions.addPanel("seventh", 70);
panelsBoardActions.deletePanel(myPanels[6]);
console.log(panelsBoardActions.getAllPanels());
// console.log(panelsBoardActions.getPanelById("05638cb6-5ae2-86f5-a847-cbafa91abd1a"));
// console.log(panelsBoardActions.updatePanelValue(myPanels[0], 30));
