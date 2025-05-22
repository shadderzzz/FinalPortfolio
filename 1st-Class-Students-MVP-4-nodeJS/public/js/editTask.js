const express = require('express');
const router = express.Router();
const database = require('./database');

// Handle GET request to render the edit task page
router.get('/', async (req, res) => {
    try {
        // Fetch tasks from the database
        const query = "SELECT * FROM tasks";
        const tasks = await database.query(query);

        // Render the edit task page with task details
        res.render('edittask.ejs', { tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Error fetching tasks.");
    }
});

module.exports = router;
