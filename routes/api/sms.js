const router = require('express').Router();
const auth = require('../auth');
const { smsController } = require('../../controllers/smsController');

router.post('/smstext',auth.required,(req, res) => {
    smsController.smsText(req, res);
});

module.exports = router;