const { PersonDataService } = require('../services/personDataService');
const { SmsDataService } = require('../services/smsDataService');

let personDataService = new PersonDataService();
let smsDataService = new SmsDataService();

smsDataService.getUnsubscribeList((data) => {

    console.log(data);
    
});