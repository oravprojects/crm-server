const { IndividualDataService } =   require('../services/individualDataService');
const { PersonDataService } =       require('../services/personDataService');
const { RTPersonData } =            require('../models/rtpersonData');
this.personDataService =            new PersonDataService();
let individualDataService =         new IndividualDataService();
let rtpersonData =                  new RTPersonData();
const _ = require('underscore');
let actions;
const e = require('../data/DataEvents.js');
let i = 1;
e.on('action_w', (n) => {
    if (i<actions.length) {
        rtpersonData.newActionFromFile(actions[i]);
    }
    i++;
    console.log(n,'=',i)
});

individualDataService.readTasks((data) => {
    actions = data;
    console.log('actions read:',actions.length);
    rtpersonData.newActionFromFile(actions[0]);
});
