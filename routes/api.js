var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api');

router.get('/',apiCtrl.index);
router.get('/:id/:survey', apiCtrl.show);
router.get('/:id/:survey/pie', apiCtrl.pie);
router.get('/:id/:survey/line', apiCtrl.line);

module.exports = router;