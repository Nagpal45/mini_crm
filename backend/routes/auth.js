const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'https://mini-crm-1.onrender.com/' }), (req, res) => {
    res.redirect('https://mini-crm-1.onrender.com/');
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/check-auth', (req, res) => {
    res.json({ authenticated: req.isAuthenticated(), user: req.user });
    console.log(req.user);
});

module.exports = router;
