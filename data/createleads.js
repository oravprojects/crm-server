const { IndividualDataService } = require('../services/individualDataService');
const { RTPersonData } = require('../models/rtpersonData');
let individualDataService = new IndividualDataService();
let rtPersonData = new RTPersonData();
let individuals;
const e = require('../data/DataEvents.js');
let i = 1;
e.on('leadd_w', (n) => {
    console.log('nn:',n)
    if (i<individuals.length) {
        rtPersonData.leadFromIndivisual(individuals[i]);
    }
    i++;
});
individualDataService.readIndividual((data) => {
    individuals = data;
    rtPersonData.leadFromIndivisual(individuals[0]);
});