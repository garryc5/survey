var express = require('express');
var router = express.Router();
var passport = require('passport');
var surveyCtrl = require('../controllers/surveys');


/* GET home page. */
router.get('/', surveyCtrl.index);
router.get('/new', surveyCtrl.new);
router.post('/',isAuth, surveyCtrl.create);
router.delete('/:id', isAuth, surveyCtrl.delete);
router.get('/show/:id/:survey', surveyCtrl.show);
router.post('/:id/:survey', surveyCtrl.takeSurvey);
router.get('/auth/google', passport.authenticate(
  'google', { scope: ['profile'] }));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function isAuth(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
