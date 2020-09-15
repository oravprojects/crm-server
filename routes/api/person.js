const router = require('express').Router();
const auth = require('../auth');
const { personController } = require('../../controllers/personController');

router.get('/persons',              auth.required,(req, res) => personController.readPersons(req, res));
router.get('/actions',              auth.required,(req, res) => personController.readActions(req, res));
router.get('/leads',                auth.required,(req, res) => personController.readLeads(req, res));
router.post('/actionnew',           auth.required,(req, res) => personController.actionNew(req, res));
router.post('/personnew',           auth.required,(req, res) => personController.personNew(req, res));
router.post('/leadnew',             auth.required,(req, res) => personController.leadNew(req, res));
router.post('/actionupdate',        auth.required,(req, res) => personController.actionUpdate(req, res));
router.post('/personupdate',        auth.required,(req, res) => personController.personUpdate(req, res));
router.post('/leadupdate',          auth.required,(req, res) => personController.leadUpdate(req, res));
router.post('/createcontract',      auth.required,(req, res) => personController.createContract(req, res));
router.post('/newfromscript',       auth.optional,(req, res) => personController.newFromScript(req, res));
router.post('/newactionfromscript', auth.optional,(req, res) => personController.newActionFromScript(req, res));
router.post('/personsbystring',     auth.required,(req, res) => personController.personsByString(req, res));
router.post('/leadbypersonid',      auth.required,(req, res) => personController.leadByPersonID(req, res));
router.post('/personbypersonid',    auth.required,(req, res) => personController.personByPersonID(req, res));
router.post('/actionsbypersonid',   auth.required,(req, res) => personController.actionsByPersonID(req, res));

module.exports = router; 