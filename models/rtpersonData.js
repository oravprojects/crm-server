const { PersonDataService } = require('../services/personDataService');
const { IndividualDataService } = require('../services/individualDataService');
const { MailDataService } = require('../services/mailDataService');
const { SmsDataService } = require('../services/smsDataService');
const { WhatsAppService } = require('../services/whatsAppService');

const _ = require('underscore');

class RTPersonData {
    constructor() {
        this.seo = [101, 134, 143, 150, 165, 165, 171, 179, 190, 201, 202, 212, 214, 232, 243, 247, 249, 253, 258, 285, 292, 296, 299, 300, 302, 308, 309, 320, 333, 346, 348, 349];
        this.int = [107, 108, 109, 111, 112, 140, 159, 160, 161, 162, 163, 164, 169, 175, 176, 177, 184, 188, 191, 192, 193, 194, 196, 199, 205, 206, 207, 208, 209, 219, 211, 215, 216, 217, 219, 221, 223, 239, 240, 241, 245, 246, 252, 258, 259, 261, 272, 284, 286, 287, 288, 291, 307, 319];
        this.ppc = [106, 265, 310];

        this.e = require('../data/DataEvents.js');
        this.personDataService = new PersonDataService();
        this.individualDataService = new IndividualDataService();
        this.mailDataService = new MailDataService();
        this.smsDataService = new SmsDataService();
        this.whatsAppService = new WhatsAppService();
        this.individualDataService.readContactTypes((data) => {
            this.contactTypes = data;
        });
    }

    newActionFromFile(task) {
        console.log('from task:', task.entryID);
        let person_id = 0;
        this.personDataService.personByEntryID(task.entryID, (data, person_id1) => {
            if (data === 1) {

                person_id = person_id1;
                this.personDataService.actionByTaskID(task.task_id, (data, action_id) => {
                    if (data === 0) {
                        this.actionByEntryID(task, person_id, (data) => {
                            this.e.emit('action_w', 1);
                        });
                    } else this.e.emit('action_w', 0);
                });
            } else this.e.emit('action_w', 0);
        });
    }

    actionByEntryID(task, person_id, callback) {
        let action = {
            b_task_id: task.task_id,
            b_client_id: task.client_id,
            type: task.type,
            amount: task.amount,
            message: task.message,
            subject: task.subject,
            user_id: task.user_id,
            create_user_id: task.create_user_id,
            update_user_id: task.update_user_id,
            status: task.status,
            create_date: task.create_date,
            start_date: task.start_date,
            due_date: task.due_date,
            update_date: new Date(task.update_date),
            priority: task.priority,
            location: task.location,
            person_id: person_id
        }
        this.personDataService.actionNew(action, (data) => {
            callback(data);
        });
    }


    entryUpdate(individual, lead_id, person_id, message, callback) {
        //console.log('entryUpdate:',lead_id,'==',person_id);
        let NoCall;
        let Source;
        if (individual.Activities == 201) { NoCall = 1 }
        else { NoCall = 0 }

        if (this.seo.includes(individual.ContactType)) {
            Source = 'SEO'
        }
        else if (this.int.includes(individual.ContactType)) {
            Source = 'INT'
        }
        else if (this.ppc.includes(individual.ContactType)) {
            Source = 'PPC'
        }
        else {
            Source = 'SNL'
        }
        let contactType = _.findWhere(this.contactTypes, { codeID: individual.ContactType });
        let lead = {
            lead_id: lead_id,
            entry_timestamp: individual.EntryDate,
            first_name: individual.FirstName,
            last_name: individual.LastName,
            phone_1: individual.Phone1,
            email: individual.Email,
            source: individual.source, //Source, 
            source_details: individual.product,
            product_id: 0,
            person_id: person_id,
            branch_id: individual.branch,
            cv_file: individual.file_path,
            cv_text: individual.CV,
        }
        this.personDataService.leadUpdateFromScript(lead, (data) => {
            let action = {
                action_id: null,
                b_task_id: 0,
                b_client_id: 0,
                type: 'LID',
                amount: 0,
                //message:        contactType.type, 
                message: 'Type : ' + contactType.type + ' Source : ' + individual.source + ' Name :' + individual.FirstName + ' ' + individual.LastName,
                subject: individual.comments,
                user_id: 100,
                create_user_id: 100,
                update_user_id: 0,
                status: 'new',
                create_date: new Date(),
                start_date: null,
                due_date: null,
                update_date: null,
                priority: 'normal',
                location: individual.branch,
                person_id: person_id
            }
            this.personDataService.actionNew(action, (data) => {
                let action_id = data;

                let sms_message = ' שלום ' + individual.FirstName + ', '
                    + 'פנייתך רשומה במערכת. היועצים שלנו יצרו איתך קשר בהקדם' +
                    ' Real Time College חטיבת ההדרכה של RT Group ' +
                    'טלפון: 077-7067057 ' +
                    ' אמייל: info@rt-ed.co.il ';

                let mail_message =
                    '<p dir="rtl">' + 'פנייתך רשומה במערכת. היועצים שלנו יצרו איתך קשר בהקדם' + '</p>' +
                    '<p dir="rtl">Real Time College חטיבת ההדרכה של RT Group</p>' +
                    '<p dir="rtl">טלפון: 077-7067057</p>' +
                    '<p dir="rtl">אמייל: info@rt-ed.co.il</p>';
                
                let whatsApp_message = ' שלום ' + individual.FirstName + ', '
                + 'פנייתך רשומה במערכת. היועצים שלנו יצרו איתך קשר בהקדם.' +
                ' Real Time College ' +
                ' חטיבת ההדרכה של Rt Group. ' +
                ' טלפון: 077-7067057 ' +
                '\n' +
                'אמייל: info@rt-ed.co.il';

                if (message) {
                    let mail = {
                        first_name: individual.FirstName,
                        last_name: individual.LastName,
                        email: individual.Email,
                        no_call: 0,
                        entry_timestamp: new Date(),
                        product_id: individual.productId,
                        branch_id: individual.branch,
                        message: mail_message,
                        subject: ' שלום ' + individual.FirstName,
                        user_id: 100
                    }
                    this.mailDataService.mailHtmlIntro(mail, (data) => {
                        let sms = {
                            first_name: individual.FirstName,
                            last_name: individual.LastName,
                            phone_1: individual.Phone1,
                            no_call: 0,
                            entry_timestamp: new Date(),
                            product_id: individual.productId,
                            branch_id: individual.branch,
                            message: sms_message,
                            subject: 'New Lead',
                            user_id: 100,
                        }
                        this.smsDataService.smsText(sms, (data) => {
                            let whatsApp = {
                                first_name: individual.FirstName,
                                last_name: individual.LastName,
                                phone_1: '+972'+individual.Phone1.substring(1),
                                no_call: 0,
                                entry_timestamp: new Date(),
                                product_id: individual.productId,
                                branch_id: individual.branch,
                                message: whatsApp_message,
                                subject: 'New Lead',
                                user_id: 100,
                            }
                            this.whatsAppService.whatsAppMessage(whatsApp, (data) => {
                            });
                        });
                    });
                    this.e.emit('person_new', person_id);
                    callback(person_id);
                }
                else {
                    this.e.emit('person_new', person_id);
                    callback(action_id);
                }
            });
        });
    }

    entryNew(individual, message, callback) {
        let person_id;
        let NoCall;
        if (individual.Activities == 201) { NoCall = 1 }
        else { NoCall = 0 }
        let Source = 'DEF';
        if (this.seo.includes(individual.ContactType)) {
            Source = 'SEO'
        }
        else if (this.int.includes(individual.ContactType)) {
            Source = 'INT'
        }
        else if (this.ppc.includes(individual.ContactType)) {
            Source = 'PPC'
        }
        else {
            Source = 'SNL'
        }
        let contactType = _.findWhere(this.contactTypes, { codeID: individual.ContactType });
        let person = {
            first_name: individual.FirstName,
            last_name: individual.LastName,
            email: individual.Email,
            phone_1: individual.Phone1,
            phone_2: individual.Phone2,
            address: individual.Address,
            country_id: individual.personID,
            no_call: NoCall,
            entry_id: individual.entryID,
            b_client_id: individual.b_entryID
        }
        this.personDataService.personNew(person, (data) => {
            person_id = data;
            console.log('p_id', person_id);
            let lead = {
                entry_timestamp: new Date(),
                first_name: individual.FirstName,
                last_name: individual.LastName,
                phone_1: individual.Phone1,
                email: individual.Email,
                source: individual.source,
                source_details: individual.product,
                product_id: 0,
                person_id: person_id,
                branch_id: individual.branch,
                cv_file: individual.file_path,
                cv_text: individual.CV,
            }
            this.personDataService.leadNew(lead, (data) => {
                let action = {
                    action_id: null,
                    b_task_id: 0,
                    b_client_id: 0,
                    type: 'LID',
                    amount: 0,
                    message: 'Type : ' + contactType.type + ' Source : ' + individual.source + ' Name :' + individual.FirstName + ' ' + individual.LastName,
                    subject: individual.comments,
                    user_id: 100,
                    create_user_id: 100,
                    update_user_id: 0,
                    status: 'new',
                    create_date: new Date(),
                    start_date: null,
                    due_date: null,
                    update_date: null,
                    priority: 'normal',
                    location: individual.branch,
                    person_id: person_id
                }
                this.personDataService.actionNew(action, (data) => {
                    let action_id = data;
                    if (message) {
                        let sms_message = ' שלום ' + individual.FirstName + ', '
                            + 'פנייתך רשומה במערכת. היועצים שלנו יצרו איתך קשר בהקדם' +
                            ' Real Time College חטיבת ההדרכה של RT Group ' +
                            'טלפון: 077-7067057 ' +
                            ' אמייל: info@rt-ed.co.il ';

                        let mail_message =
                            '<p dir="rtl">' + 'פנייתך רשומה במערכת. היועצים שלנו יצרו איתך קשר בהקדם' + '</p>' +
                            '<p dir="rtl">Real Time College חטיבת ההדרכה של RT Group</p>' +
                            '<p dir="rtl">טלפון: 077-7067057</p>' +
                            '<p dir="rtl">אמייל: info@rt-ed.co.il</p>';


                        let mail = {
                            first_name: individual.FirstName,
                            last_name: individual.LastName,
                            email: individual.Email,
                            no_call: 0,
                            entry_timestamp: new Date(),
                            product_id: individual.productId,
                            branch_id: individual.branch,
                            message: mail_message,
                            subject: ' שלום ' + individual.FirstName,
                            user_id: 100
                        }
                        this.mailDataService.mailText(mail, (data) => {
                            let sms = {
                                first_name: individual.FirstName,
                                last_name: individual.LastName,
                                phone_1: individual.Phone1,
                                no_call: 0,
                                entry_timestamp: new Date(),
                                product_id: individual.productId,
                                branch_id: individual.branch,
                                message: sms_message,
                                subject: 'New Lead',
                                user_id: 100,
                            }
                            this.smsDataService.smsText(sms, (data) => {
                                this.e.emit('person_new', person_id);
                                callback(person_id);
                            });
                        });
                    }
                    else {
                        this.e.emit('person_new', person_id);
                        callback(person_id);
                    }
                });
            });
        });
    }

    personFromIndivisual(individual) {
        let person_id;
        let NoCall;
        if (individual.Activities == 201) { NoCall = 1 }
        else { NoCall = 0 }
        let Source = 'SNL';
        if (this.seo.includes(individual.ContactType)) {
            Source = 'SEO'
        }
        else if (this.int.includes(individual.ContactType)) {
            Source = 'INT'
        }
        else if (this.ppc.includes(individual.ContactType)) {
            Source = 'PPC'
        }

        let contactType = _.findWhere(this.contactTypes, { codeID: individual.ContactType });
        let person = {
            first_name: individual.FirstName,
            last_name: individual.LastName,
            email: individual.Email,
            phone_1: individual.Phone1,
            phone_2: individual.Phone2,
            address: individual.Address,
            country_id: individual.personID,
            no_call: NoCall,
            entry_id: individual.entryID,
            b_client_id: individual.b_entryID
        }
        this.personDataService.personNew(person, (data) => {
            person_id = data;
            let lead = {
                entry_timestamp: new Date(),
                first_name: individual.FirstName,
                last_name: individual.LastName,
                phone_1: individual.Phone1,
                email: individual.Email,
                source: Source,
                source_details: contactType.type,
                product_id: null,
                person_id: person_id,
                branch_id: null,
                cv_file: individual.file_path,
                cv_text: individual.CV,
            }
            this.personDataService.leadNew(lead, (data) => {
                this.e.emit('person_w', person_id);
            });
        });
    }

    leadFromIndivisual(individual) {
        let Source = 'SNL';
        if (this.seo.includes(individual.ContactType)) {
            Source = 'SEO'
        }
        else if (this.int.includes(individual.ContactType)) {
            Source = 'INT'
        }
        else if (this.ppc.includes(individual.ContactType)) {
            Source = 'PPC'
        }
        let contactType = _.findWhere(this.contactTypes, { codeID: individual.ContactType });
        this.personDataService.personByEntryID(individual.entryID, (ddd, p_id) => {
            if (p_id > 0) {
                this.personDataService.leadByPersonID(p_id, (d) => {
                    if (d === 0) {
                        let lead = {
                            entry_timestamp: new Date(),
                            first_name: individual.FirstName,
                            last_name: individual.LastName,
                            phone_1: individual.Phone1,
                            email: individual.Email,
                            source: Source,
                            source_details: contactType.type,
                            product_id: null,
                            person_id: p_id,
                            branch_id: null,
                            cv_file: individual.file_path,
                            cv_text: individual.CV,
                        }
                        this.personDataService.leadNew(lead, (data) => {
                            this.e.emit('leadd_w', data);
                        });
                    } else this.e.emit('leadd_w', 0);
                });
            } else this.e.emit('leadd_w', 0);
        });
    }
}

module.exports = {
    RTPersonData: RTPersonData
}
