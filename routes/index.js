var express = require('express');
var router = express.Router();
var passport = require('passport');
var surveyCtrl = require('../controllers/surveys');


/* GET home page. */
router.get('/', surveyCtrl.index);
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile'] }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
module.exports = router;
