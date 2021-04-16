//import the express module
    const express = require('express');
//run an instance of the router class
    const router = express.Router();
//import the controller module
    const controller = require('../controllers/watsonCONTROLLERS');
//import the passport module
const passport = require('passport');
require('../auth/passport');
//cookie support
const isLoggedIn = require('../auth/auth');
//import twitter user model
const twitter = require('../models/twitterModel');


// Various routes 
router.get("/", controller.landing_page);
router.get('/about', controller.about_us);
router.get('/messagesuccess', controller.message_success);

router.get('/contact', controller.contact_us);
router.post('/contact', controller.post_new_contactUs);


router.get('/usertrends', controller.user_trends);
router.get('/globaltrends', controller.global_trends);
router.get('/login', controller.login);
router.get('/adminlogin', controller.admin_login);
router.get('/account', controller.account);
  
router.get('/auth/error', (req, res) => res.send('Unknown Error'));

router.get('/auth/twitter',passport.authenticate('twitter'));

router.use('/auth/twitter/callback',passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  function(req, res) {
    console.log('redirecting to landing page with ', req.user.username);
    twt = new twitter(req.user);
    console.log('user set to', twt.getUserName());
    controller.post_login();
    
});

  
  
  router.post('/',isLoggedIn,(req,res)=>{
    console.log('logged in user redirected to home page', req.user.username);
    res.render('index',{
  
    'twitterName': req.user.username}
 );
  });
  
  router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  });



//error handling - 404 page not found, and 500 internal server error
router.use(function(req, res){
    res.status(404);
    res.render('error', {
        'title': 'Error 404',
        'background': '#000',
        'errorStatus': '404',
        'errorMsg': 'Oh no! The page you\'re looking for does not exist!',
        'redFlag' : '#ff2233'
    });
});



router.use(function(err, req, res, next){
    res.status(500);
    res.render('error', {
        'title': '500 Error',
        'background':'#000',
        'errorStatus' : '500',
        'redFlag' : '#ff2233',
        'errorMsg' : err
    });
});

//make the router code accessible in the index.js file.
module.exports = router;


//Author: James Doak / Antony Lockhart - Group 23

