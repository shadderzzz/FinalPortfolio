// login.js
const express = require('express');
const router = express.Router();
const database = require('./database');

router.post('/', async (req, res) => {
    const { login_username, login_password } = req.body;

    try {
        const query = "SELECT iduser FROM `user` WHERE username=? AND password=?";
        const [user] = await database.query(query, [login_username, login_password]);

        if (user) {
            req.session.user_id = user.iduser;
            res.redirect("/homepage"); // Changed the redirect path to "/homepage"
        } else {
            req.session.login_error = "Username or password is incorrect";
            res.redirect("/login"); // Changed the redirect path to "/login"
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login.");
    }
});

module.exports = router;
