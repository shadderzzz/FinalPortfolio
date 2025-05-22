// main.js
const express = require('express');
const router = express.Router();
const database = require('./database');
const processSignupRouter = require('./process-signup');

// GET routes
router.get('/', (req, res) => {
    res.render('landing.html'); 
});

router.get('/homepage', (req, res) => {
    res.render('homePage.html'); 
});

router.get('/resource', (req, res) => {
    res.render('resource.html'); 
});

router.get('/about', (req, res) => {
    res.render('about.html'); 
});

router.get('/login', (req,res) => {
    res.render('loginPage.html');
});

router.get('/settings', (req, res) => {
    res.render('settingsPage.html'); 
});

router.get('/autoscheduler', (req, res) => {
    res.render('autoschedule.html'); 
});

router.get('/signup', (req, res) => {
    res.render('signup.html');
});

router.get('/taskPage', (req, res) => {
    res.render('taskPage.html');
});

router.get('/updateTask', (req, res) => {
    res.render('updateTask.hmtl');
});

// POST route for signup form
router.use('/signup', processSignupRouter);

module.exports = router;
