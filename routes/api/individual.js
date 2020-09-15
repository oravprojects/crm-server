const router = require('express').Router();
const auth = require('../auth');
const { individualController } = require('../../controllers/individualController');
console.log('individual');

router.post('/individualbyentyid',auth.required,(req, res) => {
  individualController.individualByEntyID(req, res)
});
router.post('/individualnew',auth.required,(req, res) => {
  individualController.individualNew(req, res)
});
module.exports = router;