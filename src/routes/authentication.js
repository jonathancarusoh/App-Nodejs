const express = require('express');
const passport = require('passport');
const router = express.Router();

const paswwport = require('passport');

router.get('/signup',(req, res)=>{
 res.render('auth/signup');
});



router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', (req, res) => {
res.render('auth/signin');
});

router.get('/profile', (req,res) => {
    res.send('this is your Profile')
});

module.exports = router; 