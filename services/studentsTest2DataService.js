//let mysqlx = require('@mysql/xdevapi');
let mysql2 = require('mysql2');
class StudentsTest2DataService {
    constructor() {
       console.log("start studentsTest2");
       this.client = mysql2.createConnection({
           user: 'apprun',
           password: ' Az12345678',
           host: '45.83.43.173',
           port: 3306,
           database: 'studentsTest2'
        });
       this.SELECT_PRODUCT_GROUP = 
       "select path.pathCode as product_group_id , path.pathName as description , path.price , path.full_price  , path.s_price  , path.s_full_price , path.payments_check , path.payments_credit from studentsTest2.path;";
       //"select path.pathCode as product_group_id, path.pathName as description, path.price as price from studentsTest2.path";
       this.SELECT_PRODUCT = 
"select coursesperpath.pathCode as product_group_id, path.pathName as product_group_description, path.price as product_group_amount , " +
"coursesperpath.courseCode as product_id, courses.courseName as description , courses.hours , courses.course_price as disc_price , " +
"courses.course_price_full as price ,  courses.course_s_price , courses.course_s_full_price, courses.course_payment_check , courses.course_payment_credit " +
"from coursesperpath left join studentsTest2.path on path.pathCode = coursesperpath.pathCode " +
"left join studentsTest2.courses on courses.courseCode = coursesperpath.courseCode where courses.exist = 1 order by product_group_id;";

       /*
       "select coursesperpath.pathCode as product_group_id, path.pathName as product_group_description, path.price as product_group_amount, "+
        "coursesperpath.courseCode as product_id, courses.courseName as description, "+
        "courses.hours, courses.course_price_full as price from coursesperpath "+
        "left join studentsTest2.path on path.pathCode = coursesperpath.pathCode "+
        "left join studentsTest2.courses on courses.courseCode = coursesperpath.courseCode where courses.exist = 1 order by product_group_id;"
        */
    }

    readProductGroup(callback) { 
        this.client.query(this.SELECT_PRODUCT_GROUP, (err, rows) => {
            console.log("SQL Answer readProductGroup :")
            callback(rows); 
        });
    }

    readProduct(callback) { 
        this.client.query(this.SELECT_PRODUCT, (err, rows) => {
            console.log("SQL Answer readProduct :")
            callback(rows); 
        });
    }
}

module.exports = {
    StudentsTest2DataService: StudentsTest2DataService
}
