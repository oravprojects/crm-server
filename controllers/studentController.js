//const { Persons } = require('../models/persons');
const { StudentsTest2DataService }  = require('../services/studentsTest2DataService');
const { StudentKnexDataService }    = require('../services/studentKnexDataService');
class StudentController {
    constructor() {
        this.MESSAGE = "studentsTest2";
        this.studentsTest2DataService = new StudentsTest2DataService();
        this.studentKnexDataService = new StudentKnexDataService();
        
    }
    readProductGroup(req, res) {
        console.log("readProductGroup");
        this.studentsTest2DataService.readProductGroup((data)=>{
            console.log("Answer from readProductGroup:",data);
            return res.json(data);
        });
    }
    readProduct(req, res) {
        console.log("readProduct");
        this.studentsTest2DataService.readProduct((data)=>{
            return res.json(data);
        });
    }
    studentVisits(req, res) {
        console.log("studentVisits");
        const { body: { attendance } } = req;
        attendance.forEach(att => {
            this.studentKnexDataService.studentVisits(att,(data)=>{
                //return res.json(data);
                console.log(data);
            });
        });
        return res.json({'att':'OK'});
    }
}

module.exports = {
    studentController: new StudentController ()
}


