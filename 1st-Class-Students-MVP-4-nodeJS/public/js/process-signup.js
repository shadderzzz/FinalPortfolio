// process-signup.js
const express = require('express');
const router = express.Router();
const database = require('./database');

router.post('/', async (req, res) => {
    const { name, email, password, password_confirmation } = req.body;

    try {
        if (!name || !email || !password || !password_confirmation) {
            res.status(400).send("All fields are required");
            return;
        }

        if (password !== password_confirmation) {
            res.status(400).send("Password does not match confirmation");
            return;
        }

        const existingUser = await database.query("SELECT iduser FROM user WHERE email=?", [email]);

        if (existingUser.length > 0) {
            res.status(400).send("Email already exists");
            return;
        }

        const result = await database.query("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

        res.redirect("/signup-success.html");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error during signup.");
    }
});

module.exports = router;
