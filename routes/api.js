var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api');

router.get('/',apiCtrl.index);
router.get('/:id/:survey', apiCtrl.show)
module.exports = router;