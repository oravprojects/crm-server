const { SmsDataService }    = require('../services/smsDataService');
const { MailDataService }   = require('../services/mailDataService');
const { PersonDataService } = require('../services/personDataService');


class CrudController {
    constructor() {
        this.smsDataService     = new SmsDataService();
        this.mailDataService    = new MailDataService();
        this.personDataService  = new PersonDataService();
    }

    sendMessageAppointmentToday() {
        return console.log('You will see this message every minute');
    }
}
module.exports = {
    crudController: new CrudController ()
}
