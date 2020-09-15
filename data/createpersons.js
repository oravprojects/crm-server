const { IndividualDataService } = require('../services/individualDataService');
const { RTPersonData } = require('../models/rtpersonData');
let individualDataService = new IndividualDataService();
let rtPersonData = new RTPersonData();
let individuals;
const e = require('../data/DataEvents.js');
let i = 1;
e.on('person_w', (n) => {
    console.log(n)
    if (i<individuals.length) {
        rtPersonData.personFromIndivisual(individuals[i]);
    }
    i++;
});
individualDataService.readIndividual((data) => {
    individuals = data;
    rtPersonData.personFromIndivisual(individuals[0]);
});