// logout.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy();
    res.redirect("/index");
});

module.exports = router;
