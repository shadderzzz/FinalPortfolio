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

// Handle POST request to delete a task
router.post('/deleteTask', isLoggedIn, (req, res) => {
    const { task_id } = req.body;
    const userID = req.session.user_id;

    const deleteQuery = "DELETE FROM tasks WHERE idtasks = ? AND idtasks IN (SELECT idtasks FROM user_task WHERE iduser = ?)";
    db.query(deleteQuery, [task_id, userID], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting task: " + err.message);
        } else {
            res.redirect('/taskPage');
        }
    });
});

// Handle GET request to fetch tasks
router.get('/', isLoggedIn, (req, res) => {
    const userID = req.session.user_id;

    let query;
    if (req.query.year && req.query.month && req.query.day) {
        const { year, month, day } = req.query;
        query = "SELECT t.idtasks, t.title, t.day, t.month, t.year, t.hour, t.minutes, t.notes " +
                "FROM tasks t INNER JOIN user_task ut ON t.idtasks = ut.idtasks " +
                "WHERE ut.iduser = ? AND t.day = ? AND t.month = ? AND t.year = ?";
        db.query(query, [userID, day, month, year], (err, result) => {
            if (err) {
                res.status(500).send("Error: " + err.message);
            } else {
                res.render('taskPage', { tasks: result });
            }
        });
    } else {
        query = "SELECT t.idtasks, t.title, t.day, t.month, t.year, t.hour, t.minutes, t.notes " +
                "FROM tasks t INNER JOIN user_task ut ON t.idtasks = ut.idtasks " +
                "WHERE ut.iduser = ?";
        db.query(query, [userID], (err, result) => {
            if (err) {
                res.status(500).send("Error: " + err.message);
            } else {
                res.render('taskPage', { tasks: result });
            }
        });
    }
});

module.exports = router;
