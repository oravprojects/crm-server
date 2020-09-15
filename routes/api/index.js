const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/individual', require('./individual'));
router.use('/person', require('./person'));
router.use('/student', require('./student'));
router.use('/statistic', require('./statistic'));
router.use('/file', require('./file'));
router.use('/email', require('./email'));
router.use('/sms', require('./sms'));

module.exports = router;