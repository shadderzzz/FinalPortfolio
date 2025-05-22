const express = require('express');
const router = express.Router();
const database = require('./database');

// Handle GET request to render the edit event page
router.get('/:task_id', async (req, res) => {
    try {
        // Get the task ID from the URL parameters
        const taskId = req.params.task_id;

        // Fetch task details from the database
        const query = "SELECT * FROM tasks WHERE idtasks = ?";
        const [task] = await database.query(query, [taskId]);

        // Check if task exists
        if (task) {
            // Render the edit event page with task details
            res.render('editevent.ejs', { task });
        } else {
            // Task not found
            res.status(404).send("Task not found!");
        }
    } catch (error) {
        console.error("Error fetching task details:", error);
        res.status(500).send("Error fetching task details.");
    }
});

module.exports = router;
