const panelsModule = require('./panels.module');


panelsModule.addPanel('Ciao', 1);
panelsModule.addPanel('Come', 2);
panelsModule.addPanel('Stai', 3, "id3");
panelsModule.addPanel('?', 4);

const myPanels = panelsModule.getAllPanels();
panelsModule.addPanel('Benone', 5);
// console.log(panelsModule.getPanelById("id3"));
// panelsModule.deletePanel(myPanels[2]);
// console.log(myPanels);
panelsModule.updatePanelValue(myPanels[4], 60);
myPanels[4].increment();
console.log(myPanels[4].value);
myPanels[4].decrement();
console.log(myPanels[4].value);



