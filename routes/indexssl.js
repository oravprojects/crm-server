var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/',(req, res) => studentController.showStudents(req, res));
const { studentController } = require('../controllers/studentController');

router.post('/student_visits', (req, res) => {
    console.log("/student_visits");
    studentController.studentVisits(req, res);
});

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'rtfs0620.xyz',image: 'images/logo.svg', server: 'Ubuntu 18.04 run NodeJs(express)' });
}); */

module.exports = router;
