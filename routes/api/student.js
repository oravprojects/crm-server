const router = require('express').Router();
const auth = require('../auth');
const { studentController } = require('../../controllers/studentController');

router.get('/readproductgroup', auth.required,(req, res) => {
    console.log("/readproductgroup");
    studentController.readProductGroup(req, res);
});
router.get('/readproduct', auth.required,(req, res) => {
    console.log("/readproduct");
    studentController.readProduct(req, res);
});
router.post('/student_visits', auth.optional,(req, res) => {
    console.log("/student_visits");
    studentController.studentVisits(req, res);
});


module.exports = router; 