class PersonDataService {
    constructor() {
        this.Q_DAYS = 30;
        /*
        this.knex = require('knex')({
            client: 'mysql2',
            connection: {
              host : '167.71.55.97',
              user : 'appdev',
              password : 'Tengrinews1965',
              database : 'rtperson'
            }
          });
          */
          this.knex = require('knex')({
            client: 'mysql2',
            connection: {
              host : '45.83.43.173',
              user : 'apprun',
              password : ' Az12345678',
              database : 'rtperson'
            }
          });
    }
    
    actionByTaskID(b_task_id, callback) {
        this.knex('action')
        .where({b_task_id: b_task_id})
        .then(rows => {
            if (rows.length === 0) { 
                console.log('Action not found');
                callback(0,0)
            } 
            else {
                console.log('Action found :',rows[0].action_id);
                callback(1,rows[0].action_id);
            }
        })
        .catch(function(error) {
            console.log('Actioin find error',error);
            callback(error);
        })
    }
    actionsByPersonID(person_id, callback) {
        this.knex('action')
        .where({person_id: person_id})
        .then(rows => {
            if (rows.length === 0) { 
                console.log('actionsByPersonId not found');
                callback(0)
            } else {
                console.log('actionsByPersonId found');
                callback(rows);
            }
        })
        .catch(function(error) {
            console.log('actionsByPersonId find error',error);
            callback(error);
        })
    }

    personsByString(inValue, callback) {
        /*let letterNumber = /^[0-9a-zA-Z\u0590-\u05fe]+$/;
        let isValid = letterNumber.test(inValue);
        if (!isValid) {
            console.log('personByString Only Alphabets and Numbers allowed');
            callback(0)
        } */
        this.knex('person')
        .where(     'first_name',  'like','%'+inValue+'%')
        .orWhere(   'last_name',   'like','%'+inValue+'%')
        .orWhere(   'email',       'like','%'+inValue+'%')
        .orWhere(   'phone_1',     'like','%'+inValue+'%')
        .orWhere(   'phone_2',     'like','%'+inValue+'%')
        .then(rows => {
            if (rows.length === 0) { 
                console.log('personByString not found');
                callback(0)
            } 
            else {
                console.log('personByString found');
                callback(rows);
            }
        })
        .catch(function(error) {
            console.log('personByString find error',error);
            callback(error);
        })
    }

    personByEntryID(entry_id, callback) {
        this.knex('person')
        .where({entry_id: entry_id})
        .then(rows => {
            if (rows.length === 0) { 
                console.log('Person not found');
                callback(0,0)
            } 
            else {
                console.log('Person found :',rows[0].person_id);
                callback(1,rows[0].person_id);
            }
        })
        .catch(function(error) {
            console.log('Person find error',error);
            callback(error);
        })
    }

    personByPersonID(person_id, callback) {
        this.knex('person')
        .where({person_id: person_id})
        .then(rows => {
            if (rows.length === 0) { 
                console.log('personByPersonID not found on person:',person_id);
                callback(0);
            } 
            else {
                console.log('personByPersonID found');
                callback(rows);
            }
        })    
        .catch(function(error) {
            console.log('Lead find error',error);
            callback(error);
        })
    }

    leadByPersonID(person_id, callback) {
        this.knex('leads')
        .where({person_id: person_id})
        .then(rows => {
            if (rows.length === 0) { 
                console.log('leadByPersonID not found on person:',person_id);
                callback(0);
            } 
            else {
                console.log('leadByPersonID found');
                callback(rows);
            }
        })    
        .catch(function(error) {
            console.log('Lead find error',error);
            callback(error);
        })
    }

    leadByEntryID(entry_id, callback) {
        this.knex('person')
        .where({entry_id: entry_id})
        .then(rows => {
            if (rows.length === 0) { 
                console.log('Person not found');
                callback(0,0,0)
            } 
            else {
                let person_id = rows[0].person_id
                console.log('person found:',person_id);
                this.knex('leads')
                .where({person_id: person_id})
                .then(rows => {
                    if (rows.length === 0) { 
                        callback(1,0,0);
                    } 
                    else {
                        let lead_id = rows[0].lead_id
                        console.log('lead found:',lead_id, person_id);
                        callback(1, lead_id, person_id);
                    }
                })
            }
        })
        .catch(function(error) {
            console.log('Person find error',error);
            callback(error);
        })
    }
    
    actionNew(action, callback) {
        console.log('actionNew:',action.person_id);
        this.knex('action')
        .insert({
            b_task_id:      action.b_task_id,
            b_client_id:    action.b_client_id,
            type:           action.type,
            amount:         action.amount,
            message:        action.message,
            subject:        action.subject,
            user_id:        action.user_id,
            create_user_id: action.create_user_id,
            update_user_id: action.update_user_id,
            status:         action.status,
            create_date:    new Date(action.create_date),
            start_date:     new Date(action.start_date),
            due_date:       new Date(action.due_date),
            update_date:    action.update_date,
            priority:       action.priority,
            location:       action.location,
            person_id:      action.person_id
        })
        .then(function(rows) {
            console.log('action new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('action new error',error);
            callback(error);
        })
    }
    leadNew(lead, callback) {
        this.knex('leads')
        .insert({
            entry_timestamp:    new Date(lead.entry_timestamp),
            first_name:         lead.first_name,
            last_name:          lead.last_name,
            phone_1:            lead.phone_1,
            email:              lead.email,
            source:             lead.source,
            source_details:     lead.source_details,
            product_id:         lead.product_id,
            product_single_id:  lead.product_single_id,
            person_id:          lead.person_id,
            branch_id:          lead.branch_id,
            cv_file:            lead.cv_file,
            cv_text:            lead.cv_text,
        })
        .then(function(rows) {
            console.log('Lead new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('Lead new error',error);
            callback(error);
        })
    }
    personNew(person, callback) {
        this.knex('person')
        .insert({
            first_name:     person.first_name,
            last_name:      person.last_name,
            email:          person.email,
            phone_1:        person.phone_1,
            phone_2:        person.phone_2,
            address:        person.address,
            country_id:     person.country_id,
            no_call:        person.no_call,
            entry_id:       person.entry_id,
            b_client_id:    person.b_client_id
        })
        .then(function(rows) {
            console.log('Person new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('Person new error',error);
            callback(error);
        })
    }
    updateNoCall(phone, callback) {
        console.log("personUpdate:",phone.Value);
        this.knex('person')
        .where({ phone_1: phone.Value })
        .update({
            no_call: 1
        })
        .then(function(rows) {
            console.log('No_Call update sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('No_Call uodate error',error);
            callback(error);
        })
    }
    personUpdate(person, callback) {
        console.log("personUpdate:",person.person_id);
        this.knex('person')
        .where({ person_id: person.person_id })
        .update({
            first_name:       person.first_name,
            last_name:        person.last_name,
            email:            person.email,
            phone_1:          person.phone_1,
            phone_2:          person.phone_2,
            address:          person.address,
            country_id:       person.country_id,
            no_call:          person.no_call,
        })
        .then(function(rows) {
            console.log('Person update sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('Person uodate error',error);
            callback(error);
        })
    }
    leadUpdateFromScript(lead, callback) {
        console.log("leadUpdate:",lead.lead_id);
        this.knex('leads')
        .where({ lead_id: lead.lead_id })
        .update({
            //entry_timestamp:    new Date(lead.entry_timestamp),
            first_name:         lead.first_name,
            last_name:          lead.last_name,
            phone_1:            lead.phone_1,
            email:              lead.email,
            source:             lead.source,
            source_details:     lead.source_details,
            cv_file:            lead.cv_file,
            cv_text:            lead.cv_text,
        })
        .then(function(rows) {
            console.log('Lead update sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('Lead uodate error',error);
            callback(error);
        })
    }
    leadUpdate(lead, callback) {
        console.log("leadUpdate:",lead.lead_id);
        this.knex('leads')
        .where({ lead_id: lead.lead_id })
        .update({
            source_details:   lead.source_details,
            product_id:       lead.product_id,
            product_single_id:lead.product_single_id,
            branch_id:        lead.branch_id,
            status: lead.     status,
        })
        .then(function(rows) {
            console.log('Lead update sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('Lead uodate error',error);
            callback(error);
        })
    }
    actionUpdate(action, callback) {
        console.log("actionUpdate:",action.action_id);
        this.knex('action')
        .where({ action_id: action.action_id })
        .update({
            message:        action.message,
            subject:        action.subject,
            user_id:        action.user_id,
            update_user_id: action.update_user_id,
            status:         action.status,
            create_date:    new Date(action.create_date),
            start_date:     new Date(action.start_date),
            due_date:       new Date(action.due_date),
            update_date:    new Date(action.update_date),
            priority:       action.priority,
            location:       action.location,
        })
        .then(function(rows) {
            console.log('Action update sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('Action uodate error',error);
            callback(error);
        })
    }
    readPersons(callback) {
        console.log("readPersons");
        let d = new Date();
        d.setDate( d.getDate() - this.Q_DAYS );
        console.log(d);
        this.knex.select("*").from('person')
        .whereIn('person_id', function() {
            this.from('action')
                .where('create_date', '>=', d)
                .select('person_id')
                .groupBy('person_id');
                /*
            this.from('leads').where(
                'entry_timestamp', '>=', d
                ).select('person_id');
                */
        })
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }
    readPersonsFull(callback) {
        console.log("readPersonsFull");
        this.knex.select("*").from('person')
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }
    readActions(callback) {
        console.log("readActions");
        let d = new Date();
        d.setDate( d.getDate() - this.Q_DAYS );
        console.log(d);
        this.knex.select("*").from('action')
        .whereIn('person_id', function() {
            this.from('action')
            .where('create_date', '>=', d)
            .select('person_id')
            .groupBy('person_id');
            /*
            this.from('leads').where(
                'entry_timestamp', '>=', d
                ).select('person_id');
            */

        })
        .orderBy('create_date', 'desc')
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }
    readLeads(callback) { 
        console.log("readLeads");
        let d = new Date();
        d.setDate( d.getDate() - this.Q_DAYS );
        console.log(d);
        this.knex.select("*").from('leads')
        .whereIn('person_id', function() {
            this.from('action')
                .where('create_date', '>=', d)
                .select('person_id')
                .groupBy('person_id');
        })
        /*
        this.knex.from('leads').where(
            'entry_timestamp', '>=', d
            ).select("*")
            */
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }
    readLeadsFull(callback) { 
        console.log("readLeadsfull");
        this.knex.from('leads').select("*")
        .then(function(rows) {
            callback(rows);
        })
        .catch(function(error) {
            callback(error);
        })
    }
}
module.exports = {
    PersonDataService: PersonDataService
}
