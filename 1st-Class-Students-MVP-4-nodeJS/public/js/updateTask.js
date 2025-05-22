const express = require('express');
const router = express.Router();
const db = require('./database');

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/loginPage');
    } else {
        next();
    }
};

// Handle POST request to edit an event
router.post('/', isLoggedIn, (req, res) => {
    const { task_id, title, day, month, year, hour, minutes, venue, notes } = req.body;

    const updateQuery = "UPDATE tasks " +
                        "SET title = ?, day = ?, month = ?, year = ?, hour = ?, minutes = ?, venue = ?, notes = ? " +
                        "WHERE idtasks = ?";
    db.query(updateQuery, [title, day, month, year, hour, minutes, venue, notes, task_id], (err, result) => {
        if (err) {
            res.status(500).send("Error updating task: " + err.message);
        } else {
            res.redirect('/taskPage');
        }
    });
});

module.exports = router;
