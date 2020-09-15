class IndividualDataService {
    constructor() {
        this.knex = require('knex')({
            client: 'mysql2',
            connection: {
                host : '45.83.43.173',
                user : 'apprun',
                password : ' Az12345678',
                database : 'smartcv'
            }
        });
    }

    individualNew(individual, callback) {
        this.knex('Individual')
        .insert({
            //entryID,
            //EntryDate:      new Date(),
            //NewEntryDate:   new Date(),
            FirstName:      individual.FirstName,
            LastName:       individual.LastName,
            personID:       individual.personID,
            Phone1:         individual.Phone1,
            Email:          individual.Email,
            //LastUpdate:     null,
            //DateOfBirth:    null,
            Phone2:         individual.Phone2,
            //City:           '',
            //Address:        '',
            //ContactType:    100,
            //TaskOf:         500,
            //addTask:        600,
            //Meeting:        null,
            //CV:             '',
            //Complete:       0,
            //addText:        '',
            //training:       0,
            //Activities:     0,
            //addTask2:       700,
            //meetAgree:      800,
            //meetAgree2:     900,
            //jobCommit:      'לא',
            //"0us_1him":     0,
            //file_path:      '',
            //newsletter:     0,
            //writeDate:      null,
            //gender:         '',
            //company_id:     0,
            //allowed_sms:    1,
            //relevant:       0,
            //b_entryID:      0,
            location:       individual.location,
            //testText:       '',

        })
        .then(function(rows) {
            console.log('Individual new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('individual new error',error);
            callback(error);
        })
    }

    readContactTypes(callback) {
        this.knex.from('ContactTypes').select("*")
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }

    individualByEntyID(entry_id,callback) { 
        console.log("individualByEntyID");
        this.knex.from('Individual')
        .where({entryID: entry_id})
        .then(rows => {
            if (rows.length === 0) { 
                callback(0)
            } else {
                callback(rows);
            }
        })
        .catch((error) => {
            callback(error);
        })
    }

    readIndividual(callback) { 
        console.log("readIndividual");
        this.knex.from('Individual').select("*")
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }

    readTasks(callback) { 
        console.log("readIndividual");
        this.knex.from('tasks').select("*")
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }
}

module.exports = {
    IndividualDataService: IndividualDataService
}
