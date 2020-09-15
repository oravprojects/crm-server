let mysql2 = require('mysql2');
class StatisticDataService {
    constructor() {
       console.log("start Statistic");
       this.client = mysql2.createConnection({
           user: 'apprun',
           password: ' Az12345678',
           host: '45.83.43.173',
           port: 3306,
           database: 'rtperson'
        });
        // STATISTIC LID BETWEEN TWO DATES
        this.SELECT_LID_INTERVAL_TBL = "SELECT action.create_date, action.action_id , action.message , leads.* , person.entry_id, person.no_call , person.phone_1 , person.email from  action  left join leads on action.person_id = leads.person_id left join person on action.person_id = person.person_id where create_date BETWEEN ? AND ? AND type = 'LID' AND leads.source != 'INT' order by action.create_date desc;";

        this.SELECT_LID_INTERVAL_ALL = "SELECT leads.source  as data, count(*) as total from  action  left join leads on action.person_id = leads.person_id left join person on action.person_id = person.person_id where create_date BETWEEN ? AND ?  AND type = 'LID' AND leads.source != 'INT' group by leads.source;";

        this.SELECT_LID_INTERVAL_SRC = "SELECT leads.source_details as data, count(*) as total FROM action  left join leads on action.person_id = leads.person_id left join person on action.person_id = person.person_id where create_date BETWEEN ? AND ? AND type = 'LID' AND leads.source != 'INT' AND leads.source = ? group by leads.source_details order by total desc;";


        // STATISTIC Appointment BETWEEN TWO DATES
        this.SELECT_APP_INTERVAL_TBL = "SELECT leads.*, action.*  FROM leads left join action on leads.person_id = action.person_id where action.create_date BETWEEN ? AND ? AND action.type = 'Appointment' AND leads.source != 'INT';";
        this.SELECT_APP_INTERVAL_STA = "SELECT action.status as data, count(*) as total FROM leads left join action on leads.person_id = action.person_id where  action.create_date BETWEEN ? AND ? AND action.type = 'Appointment' AND leads.source != 'INT' group by action.status;";
        
        this.SELECT_APP_INTERVAL_USR = "SELECT action.user_id as id , smartcv.users.username as data , count(*) as total FROM leads left join action on leads.person_id = action.person_id  left join smartcv.users on smartcv.users.userid = action.user_id  where  action.create_date BETWEEN ? AND ? AND action.type = 'Appointment' AND leads.source != 'INT' group by action.user_id order by action.user_id desc;";
        
        this.SELECT_APP_INTERVAL_SRC = "SELECT leads.source as data, count(*) as total FROM leads left join action on leads.person_id = action.person_id where  action.create_date BETWEEN ? AND ? AND action.type = 'Appointment' AND leads.source != 'INT' group by leads.source;";


        // STATISTIC Proposal BETWEEN TWO DATES

        this.SELECT_CON_INTERVAL_TBL = "SELECT leads.branch_id , leads.person_id  , leads.phone_1 , leads.email , leads.first_name , leads.last_name , leads.source , action.message, action.status, action.amount, action.user_id, action.create_user_id FROM action left join leads on leads.person_id = action.person_id where  action.create_date BETWEEN ? AND ? AND action.type = 'Proposal';";        
        this.SELECT_CON_INTERVAL_SRC = "SELECT app.source as data, count(*) as total FROM ( SELECT leads.source , action.create_user_id  FROM action left join leads on leads.person_id = action.person_id where action.create_date BETWEEN ? AND ? AND action.type = 'Proposal' ) as app group by app.source; ";

        this.SELECT_CON_INTERVAL_USR = "SELECT app.create_user_id as id, smartcv.users.username as data , count(*) as total FROM ( SELECT leads.source , action.create_user_id FROM action left join leads on leads.person_id = action.person_id  where action.create_date BETWEEN ? AND ? AND action.type = 'Proposal' )  as app  left join smartcv.users on smartcv.users.userid = app.create_user_id   group by app.create_user_id; ";


        // STATISTIC NotRElevant BETWEEN TWO DATES
        this.SELECT_NOT_INTERVAL_TBL = "SELECT leads.* , action.*  FROM leads left join action on leads.person_id = action.person_id where  leads.person_id in ( SELECT leads.person_id FROM leads where person_id IN ( select person_id FROM rtperson.action where create_date BETWEEN ? AND ?  AND type = 'LID') AND source != 'INT' ) AND action.type = 'NotRelevant';";
        this.SELECT_NOT_INTERVAL_SRC = "SELECT leads.source as data, count(*) as total FROM leads left join action on leads.person_id = action.person_id where  leads.person_id in ( SELECT leads.person_id FROM leads where person_id IN ( select person_id FROM rtperson.action where create_date BETWEEN ? AND  ?  AND type = 'LID') AND source != 'INT' )  AND action.type = 'NotRelevant' group by leads.source;";
    
        this.SELECT1_NOT_INTERVAL_TBL = "SELECT leads.* , action.*  FROM leads left join action on leads.person_id = action.person_id where action.create_date BETWEEN ? AND ? AND action.type = 'NotRelevant' AND leads.source != 'INT';";
        this.SELECT1_NOT_INTERVAL_SRC = "SELECT leads.source as data, count(*) as total FROM leads left join action on leads.person_id = action.person_id where  action.create_date BETWEEN ? AND ? AND action.type = 'NotRelevant' AND leads.source != 'INT' group by leads.source;";
    
        // STATISTIC Task BETWEEN TWO DATES
        this.SELECT_TAS_INTERVAL_TBL = "SELECT leads.*, action.*  FROM leads left join action on leads.person_id = action.person_id where  action.create_date BETWEEN ? AND ? AND action.type = 'Task' AND leads.source != 'INT';";
        
        this.SELECT_TAS_INTERVAL_USR = "SELECT action.create_user_id as id, smartcv.users.username as data , count(*) as total FROM leads left join action on leads.person_id = action.person_id  left join smartcv.users on smartcv.users.userid = action.create_user_id where  action.create_date BETWEEN ? AND ? AND action.type = 'Task' AND leads.source != 'INT' group by action.create_user_id order by total desc;";
    
    
        // Report LID Uval
        this.SELECT_LID = "SELECT lid.person_id , ANY_VALUE(actcount.actions) as actions , ANY_VALUE(lid.phone) as phone  , ANY_VALUE(lid.name) as name , ANY_VALUE(lid.create_date) as create_date , ANY_VALUE(lid.source) as source , ANY_VALUE(lid.status) as status , ANY_VALUE(lid.pathName ) as path, ANY_VALUE(lid.branch_id ) as branch, ANY_VALUE(contract.start_date) as start_date , ANY_VALUE(contract.amount) as amount , ANY_VALUE(last.type ) as type , ANY_VALUE(last.message) as message ,  ANY_VALUE(last.start_date) as status_date from ( "+
        " SELECT leads.person_id, leads.phone_1 as phone, action.create_date , CONCAT(person.first_name,' ',person.last_name) AS name , CONCAT(leads.source,' ',leads.source_details) AS source, leads.status , leads.product_id, studentsTest2.path.pathName , leads.branch_id  FROM leads left join action on leads.person_id = action.person_id left join person on person.person_id = leads.person_id left join studentsTest2.path on studentsTest2.path.pathCode = leads.product_id "+
        "where action.create_date BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND DATE_SUB(NOW(), INTERVAL ? DAY) AND action.type = 'LID' AND leads.source != 'INT' ) as lid left join ( SELECT action.start_date , action.amount , action.person_id FROM action where action.type = 'Proposal' ) as contract on contract.person_id = lid.person_id "+ 
        " left join ( select count(*) as actions, action.person_id from action  left join leads on leads.person_id = action.person_id where type = 'LID'  AND leads.source !='INT' AND  action.create_date BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND DATE_SUB(NOW(), INTERVAL 0 DAY) group by action.person_id ) as actcount on actcount.person_id = lid.person_id " +
        "left join ( select action.person_id , action.type , action.message ,  action.start_date from action where action_id in ( SELECT max(action.action_id) as action_id FROM action "+
        "where action.create_date BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND DATE_SUB(NOW(), INTERVAL ? DAY) group by action.person_id) ) as last on last.person_id = lid.person_id group by lid.lid.person_id;";


        // Report LID Uval
        this.SELECT_LID_INT = "SELECT lid.person_id , ANY_VALUE(actcount.actions) as actions , ANY_VALUE(lid.phone) as phone  , ANY_VALUE(lid.name) as name , ANY_VALUE(lid.create_date) as create_date , ANY_VALUE(lid.source) as source , ANY_VALUE(lid.status) as status , ANY_VALUE(lid.pathName ) as path, ANY_VALUE(lid.branch_id ) as branch, ANY_VALUE(contract.start_date) as start_date , ANY_VALUE(contract.amount) as amount , ANY_VALUE(last.type ) as type , ANY_VALUE(last.message) as message ,  ANY_VALUE(last.start_date) as status_date from ( "+
        " SELECT leads.person_id, leads.phone_1 as phone, action.create_date , CONCAT(person.first_name,' ',person.last_name) AS name , CONCAT(leads.source,' ',leads.source_details) AS source, leads.status , leads.product_id, studentsTest2.path.pathName , leads.branch_id  FROM leads left join action on leads.person_id = action.person_id left join person on person.person_id = leads.person_id left join studentsTest2.path on studentsTest2.path.pathCode = leads.product_id "+
        "where action.create_date BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND DATE_SUB(NOW(), INTERVAL ? DAY) AND action.type = 'LID' AND leads.source = 'INT' ) as lid left join ( SELECT action.start_date , action.amount , action.person_id FROM action where action.type = 'Proposal' ) as contract on contract.person_id = lid.person_id "+ 
        " left join ( select count(*) as actions, action.person_id from action  left join leads on leads.person_id = action.person_id where type = 'LID'  AND leads.source !='INT' AND  action.create_date BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND DATE_SUB(NOW(), INTERVAL 0 DAY) group by action.person_id ) as actcount on actcount.person_id = lid.person_id " +
        "left join ( select action.person_id , action.type , action.message ,  action.start_date from action where action_id in ( SELECT max(action.action_id) as action_id FROM action "+
        "where action.create_date BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND DATE_SUB(NOW(), INTERVAL ? DAY) group by action.person_id) ) as last on last.person_id = lid.person_id group by lid.lid.person_id;";

    }
    // INT lids
    leadsJobMaster(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_LID_INT, [intEnd,intStart,intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }

    // Report LID Uval
    leadsReport(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_LID, [intEnd,intStart,intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }

    // STATISTIC LID BETWEEN TWO DATES
    leads2DatesTable(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_LID_INTERVAL_TBL, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    leadsTotal2Dates(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_LID_INTERVAL_ALL, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    leadsSRC2Dates(intEnd,intStart,src,callback) { 
        this.client.query(this.SELECT_LID_INTERVAL_SRC, [intEnd,intStart,src], (err, rows) => {
            callback(rows); 
        });
    }
    // STATISTIC Appointment BETWEEN TWO DATES
    app2DatesTable(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_APP_INTERVAL_TBL, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    app2DatesStatus(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_APP_INTERVAL_STA, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    app2DatesUser(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_APP_INTERVAL_USR, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    app2DatesSource(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_APP_INTERVAL_SRC, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    // STATISTIC Proposal BETWEEN TWO DATES
    con2DatesTable(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_CON_INTERVAL_TBL, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    con2DatesUser(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_CON_INTERVAL_USR, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    con2DatesSource(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_CON_INTERVAL_SRC, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    // STATISTIC NotRElevant BETWEEN TWO DATES
    not2DatesTable(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_NOT_INTERVAL_TBL, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    not2DatesSource(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_NOT_INTERVAL_SRC, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    // STATISTIC Task BETWEEN TWO DATES
    tas2DatesTable(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_TAS_INTERVAL_TBL, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
    tas2DatesUser(intEnd,intStart,callback) { 
        this.client.query(this.SELECT_TAS_INTERVAL_USR, [intEnd,intStart], (err, rows) => {
            callback(rows); 
        });
    }
}

module.exports = {
    StatisticDataService: StatisticDataService
}
