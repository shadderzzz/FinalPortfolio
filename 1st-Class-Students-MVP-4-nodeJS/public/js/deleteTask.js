const express = require('express');
const router = express.Router();
const database = require('./database');

// Handle POST request to delete a task
router.post('/', async (req, res) => {
    try {
        // Get the task ID from the request body
        const taskId = req.body.task_id;

        // Perform the deletion query
        const deleteQuery = "DELETE FROM tasks WHERE idtasks = ?";
        await database.query(deleteQuery, [taskId]);

        // Redirect to taskPage upon success
        res.redirect("/taskPage");
    } catch (error) {
        // Error occurred during deletion
        console.error("Error deleting task:", error);
        res.status(500).send("Error deleting task.");
    }
});

module.exports = router;
