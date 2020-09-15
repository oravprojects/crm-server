//const { Persons } = require('../models/persons');
const { PersonDataService } = require('../services/personDataService');
const { OfficeGenDataService } = require('../services/officeGenDataService');
const { RTPersonData } = require('../models/rtpersonData');

class PersonController {
    constructor() {
        this.MESSAGE = "person";
        this.personDataService = new PersonDataService();
        this.officeGenDataService = new OfficeGenDataService();
        this.rtPersonData = new RTPersonData();
    }
    createContract(req, res) {
        const { body: { contract,courses } } = req;
        this.officeGenDataService.createContract(contract,courses,(data) =>{return res.json(data)});
    }

    newActionFromScript(req, res) {
        const { body: { task } } = req;
        let person_id = 0;
        console.log('from:',task.entry_id);
        this.personDataService.personByEntryID(task.entry_id,(data,person_id1)=>{
            if (data===1) {
                person_id = person_id1;
                this.personDataService.actionByTaskID(task.task_id,(data,action_id)=>{
                    if (data===0) {
                        this.rtPersonData.actionByEntryID(task,person_id,(data)=>{
                            return res.json(data);
                        });
                    } else res.json({error:{action_id:action_id}});
                });
            } else return res.json({error:{ernty_id:0}});
        });
    }
    newFromScript(req, res) {
        const { body: { individual } } = req;
        console.log('from:',individual.entryID);
        this.personDataService.leadByEntryID(individual.entryID,(data,lead_id, person_id)=>{
            console.log('data:',data,'==',lead_id,'==',person_id);
            if (data===1) {
                this.rtPersonData.entryUpdate(individual,lead_id,person_id,false,(data)=>{
                    return res.json(data);
                });
            } else if (data===0) {
                this.rtPersonData.entryNew(individual,false,(data)=>{
                    return res.json(data);
                });
            } else {
                return res.json(data);
            }
        });
    }
    actionNew(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        const { body: { action } } = req;
        this.personDataService.actionNew(action,(data)=>{
            return res.json(data);
        });
    }
    personsByString(req, res) {
        const { payload: { id } } = req;
        console.log('personsByString:',id);
        const { body: { in_value } } = req;
        this.personDataService.personsByString(in_value,(data)=>{
            return res.json(data);
        });
    }
    personByPersonID(req, res) {
        const { payload: { id } } = req;
        console.log('personByPersonId:',id);
        const { body: { person_id } } = req;
        this.personDataService.personByPersonID(person_id,(data)=>{
            return res.json(data);
        });
    }
    leadByPersonID(req, res) {
        const { payload: { id } } = req;
        console.log('leadByPersonId:',id);
        const { body: { person_id } } = req;
        this.personDataService.leadByPersonID(person_id,(data)=>{
            return res.json(data);
        });
    }
    actionsByPersonID(req, res) {
        const { payload: { id } } = req;
        console.log('actionsByPersonId:',id);
        const { body: { person_id } } = req;
        this.personDataService.actionsByPersonID(person_id,(data)=>{
            return res.json(data);
        });
    }
     
    personNew(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        const { body: { person } } = req;
        this.personDataService.personNew(person,(data)=>{
            return res.json(data);
        });
    }
    leadNew(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        const { body: { lead } } = req;
        this.personDataService.leadNew(lead,(data)=>{
            return res.json(data);
        });
    }

    actionUpdate(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        const { body: { action } } = req;
        this.personDataService.actionUpdate(action,(data)=>{
            return res.json(data);
        });
    }
    personUpdate(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        const { body: { person } } = req;
        this.personDataService.personUpdate(person,(data)=>{
            return res.json(data);
        });
    }
    leadUpdate(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        const { body: { lead } } = req;
        this.personDataService.leadUpdate(lead,(data)=>{
            return res.json(data);
        });
    }
    readPersons(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        this.personDataService.readPersons((data)=>{
            return res.json(data);
        });
    }
    readActions(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        this.personDataService.readActions((data)=>{
            return res.json(data);
        });
    }
    readLeads(req, res) {
        const { payload: { id } } = req;
        console.log(this.MESSAGE,id);
        this.personDataService.readLeads((data)=>{
            return res.json(data);
        });
    }
    
}

module.exports = {
    personController: new PersonController ()
}


