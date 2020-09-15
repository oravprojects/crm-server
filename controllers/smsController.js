//const { Persons } = require('../models/persons');
const { SmsDataService } = require('../services/smsDataService');


class SmsController {
    constructor() {
        this.MESSAGE = "hello from SMS Service";
        this.smsDataService = new SmsDataService();
    }

    smsText(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        const { body: { sms } } = req;
        this.smsDataService.smsText(sms,(data)=>{
            return res.json(data);
        });
    }
}
module.exports = {
    smsController: new SmsController ()
}


