const express = require('express');
const router = express.Router();
const database = require('./database');

// Handle POST request to add an event
router.post('/', async (req, res) => {
    try {
        // Get values from the request body
        const { title, day, month, year, hour, minutes, venue, notes } = req.body;

        // Perform the insertion query
        const insertQuery = "INSERT INTO tasks (day, month, year, hour, minutes, title, venue, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await database.query(insertQuery, [day, month, year, hour, minutes, title, venue, notes]);

        // Redirect to taskPage upon success
        res.redirect("/taskPage");
    } catch (error) {
        // Error occurred during insertion
        console.error("Error adding task:", error);
        res.status(500).send("Error adding task.");
    }
});

module.exports = router;
