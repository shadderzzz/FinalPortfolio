// register.js
const express = require('express');
const router = express.Router();
const database = require('./database');

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const query = "INSERT INTO `user` (username, password, email, sleepTime) VALUES (?, ?, ?, 0)";
        await database.query(query, [username, password, email]);

        res.send("Registration successful");
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Error during registration: " + error.message); // Send error message to client
    }
});

module.exports = router;
