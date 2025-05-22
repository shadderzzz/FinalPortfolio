// homepage.js

// Require necessary modules
const express = require('express');
const router = express.Router();
const database = require('./database');

// Handle GET request to render the homepage
router.get('/', async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.user_id) {
            // Redirect to login page if not logged in
            res.redirect("/loginPage");
            return;
        }

        // Fetch user's name based on their user ID
        const userId = req.session.user_id;
        const query = "SELECT username FROM `user` WHERE iduser = ?";
        const [user] = await database.query(query, [userId]);

        // Check if user exists
        if (user) {
            // Render the homepage with the user's name
            res.render('homepage.ejs', { user_name: user.username });
        } else {
            // Unable to fetch user's name, set default
            res.render('homepage.ejs', { user_name: "User" });
        }
    } catch (error) {
        console.error("Error rendering homepage:", error);
        res.status(500).send("Error rendering homepage.");
    }
});

module.exports = router;
