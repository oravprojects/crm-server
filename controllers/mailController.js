//const { Persons } = require('../models/persons');
const { MailDataService } = require('../services/mailDataService');
const { PersonDataService } = require('../services/personDataService');

class MailController {
    constructor() {
        this.MESSAGE = "hello from Mail Service";
        this.mailDataService = new MailDataService();
        this.personDataService = new PersonDataService();
    }

    mailText(req, res) {
        const { payload: { id } } = req;
        const { body: { mail } } = req;
        console.log('mail:',mail);
        this.mailDataService.mailText(mail,(data)=>{
            return res.json(data);
        });
    }
}
module.exports = {
    mailController: new MailController ()
}


