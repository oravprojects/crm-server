const { IndividualDataService } = require('../services/individualDataService');

class IndividualController {
    constructor() {
        this.MESSAGE = "individual Controller";
        this.individualDataService = new IndividualDataService();
    }
    individualNew(req, res) {
        const { payload: { id } } = req;
        console.log('individualNew:',id);
        const { body: { individual } } = req;
        this.individualDataService.individualNew(individual,(data)=>{
            return res.json(data);
        });
    }
    individualByEntyID(req, res) {
        const { payload: { id } } = req;
        console.log('individualByEntyID:',id);
        const { body: { entry_id } } = req;
        this.individualDataService.individualByEntyID(entry_id,(data)=>{
            return res.json(data);
        });
    }
}
module.exports = {
    individualController: new IndividualController ()
}


