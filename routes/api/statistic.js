const router = require('express').Router();
const auth = require('../auth');
const { statisticController } = require('../../controllers/statisticController');


router.post('/report_interval', auth.optional,(req, res) => {
    console.log("/report_interval");
    statisticController.reportInterval(req, res);
});

router.post('/leads_report', auth.optional,(req, res) => {
    console.log("/leads_report");
    statisticController.leadsReport(req, res);
});

router.post('/leads_jobmaster', auth.optional,(req, res) => {
    console.log("/leads_jobmaster");
    statisticController.leadsJobMaster(req, res);
});

module.exports = router; 