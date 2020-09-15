class StudentKnexDataService {
    constructor() {
        this.MESSAGES_LIMIT = 10;
        this.knex = require('knex')({
            client: 'mysql2',
            connection: {
              host : '45.83.43.173',
              user : 'apprun',
              password : ' Az12345678',
              database : 'studentsTest2'
            }
          });
    }


    studentVisits(attendance, callback) {
       this.knex('student_visit')
        .where({
            cycle:      attendance.cycle,
            studentID:  attendance.studentID,
            session:    attendance.session,
        })
        .then(rows => {
            if (rows.length > 0) { // record exist
                this.knex('student_visit')
                .where({ 
                    cycle:      attendance.cycle,
                    studentID:  attendance.studentID,
                    session:    attendance.session,
                 })
                .update({ 
                    visit:      attendance.visit,
                })
                .then (function(res) {
                    callback(res);
                })
            } else { //new record
                this.knex('student_visit').insert({
                    cycle:      attendance.cycle,
                    studentID:  attendance.studentID,
                    session:    attendance.session,
                    visit:      attendance.visit,
                })
                .then (function(res) {
                    callback(res);
                })
            }
        })
        .catch(function(error) {
            console.log('student_visits eror',error);
            callback(error);
        })
    }

    studentsNew(student) {
        //create password

        this.knex('students')
        .insert({
            studentID:          student.studentID,
            firstName:          student.firstName,
            familyName:         student.familyName,
            address:            student.address,
            email:              student.email,
            mobileNumber:       student.mobileNumber,
            idImage:            null,
            status:             student.status,
            secondMobileNumber: student.secondMobileNumber,
            registeryDate:      student.registeryDate,
            username:           student.username,
            password:           student.password,
            role:               student.role,
            theme:              student.theme,
            paymentMethodsCode: student.paymentMethodsCode,
            location:           student.location,
            amount:             student.amount,
        })
        .then(function(rows) {
            console.log('student new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('student new error',error);
            callback(error);
        })
    }

    messagesHistoryByTicket(ticket, callback) {
        this.knex('message')
        .where({ ticket: ticket })
        .orderBy('date', 'desc')
        .then(rows => {
            callback(rows);
        })
        .catch(function(error) {
            console.log('Message history error',error);
            callback(error);
        })
    }

    messagesHistory(message, callback) {
        this.knex('message')
        .orderBy('date', 'desc')
        .limit(this.MESSAGES_LIMIT)
        .orderBy('date')
        .then(rows => {
            callback(rows);
        })
        .catch(function(error) {
            console.log('Message history error',error);
            callback(error);
        })
    }
    messageNew(message, callback) {
        this.knex('message')
        .insert({
           // _id:    message.,
            mess:   message.mess,
            student: message.student,
            ticket: message.ticket,
            date:   new Date(message.date), 
            cat:    message.cat, 
            name:   message.name,
            id:     message.id,
            sock:   message.sock, 

        })
        .then(function(rows) {
            console.log('message new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('message new error',error);
            callback(error);
        })
    }

    ticketNew(ticket, callback) {
        this.knex('ticket')
        .insert({            
            //ticket_id ,
            student_id: ticket.student_id ,
            req_type:   ticket.req_type ,
            req_reason: ticket.req_reason ,
            req_date:   new Date(ticket.req_date),
        })
        .then(function(rows) {
            console.log('ticket new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('ticket new error',error);
            callback(error);
        })
    }
    ticketUpdate(ticket,ticket_id, callback) {
        this.knex('ticket')
        .where({ ticket_id: ticket_id })
        .update({ 
            admin_id:   ticket.admin_id ,
            ans_type:   ticket.ans_type ,
            ans_reason: ticket.ans_reason ,
            ans_date:   new Date(ticket.ans_date),
            act_date:   new Date(ticket.act_date),
            course_id:  ticket.course_id ,
            path_id:    ticket.path_id ,
            cycle_id:   ticket.cycle_id ,
        })
        .then(function(rows) {
            console.log('ticket new sucess',rows);
            callback(rows);
        })
        .catch(function(error) {
            console.log('ticket new error',error);
            callback(error);
        })
    }
    ticketHistoryByStudent(student, callback) {
        this.knex('ticket')
        .where({student_id: student})
        .orderBy('req_date', 'desc')
        .then(rows => {
            callback(rows);
        })
        .catch(function(error) {
            console.log('ticket history error',error);
            callback(error);
        })
    }

}


module.exports = {
    StudentKnexDataService: StudentKnexDataService
}
