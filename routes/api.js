var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api');

router.get('/',apiCtrl.index);

module.exports = router;