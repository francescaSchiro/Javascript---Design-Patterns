const Panel = require("./models/Panel");

// Create a Board that manages all Panels

const panelsModule = (function () {
  // All of my created instances from the Panel counstructor
  var _panels = [];

  /**
   *  Add panel to _panels array
   * @param { string } label
   * @param { number } value
   * @param { ?string } id            Just to test the getPanelById method
   */
  function addPanel(label, value, id) {
    var newPan = new Panel(label, value, id);
    _panels.push(newPan);
  }

  /**
   *  Get a panel by passed id
   * @param { string } id
   * @returns { Panel }
   */
  function getPanelById(id) {
    for (let i = 0; i < _panels.length; i++) {
      const panel = _panels[i];
      if (id === panel.id) {
        return panel;
      }
    }
  }

  /**
   * Return all created panels
   * @returns { Array<Panel> }
   */
  function getAllPanels() {
    return _panels;
  }

  /**
   * Updates the panel value with the passed number
   * @param { Panel } panel
   * @param { number } value
   * @returns { Panel }
   */
  function updatePanelValue(panel, value) {
    panel.value = value;
    return panel;
  }

  /**
   * Remove the passed panel from the panels array
   * @param { Panel } panel
   */
  function deletePanel(panel) {
    var indexOfPanelToRemove = _panels.indexOf(panel);
    if (indexOfPanelToRemove !== -1) {
      _panels.splice(indexOfPanelToRemove, 1);
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

module.exports = panelsModule;
