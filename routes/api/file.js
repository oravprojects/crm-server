const router = require('express').Router();
const auth = require('../auth');
const { fileController } = require('../../controllers/fileController');

router.post('/writefilebase64',auth.optional,(req, res) => {
    fileController.writeFileBase64(req, res);
});

router.post('/readdirbyname',auth.optional,(req, res) => {
    fileController.readDirByName(req, res);
});

router.post('/readfilebase64',auth.optional,(req, res) => {
    fileController.readFileBase64(req, res);
});

module.exports = router;