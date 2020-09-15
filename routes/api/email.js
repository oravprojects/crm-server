const router = require('express').Router();
const auth = require('../auth');
const { mailController } = require('../../controllers/mailController');

router.post('/mailtext',auth.required,(req, res) => {
    mailController.mailText(req, res);
    console.log('email')
});

module.exports = router;