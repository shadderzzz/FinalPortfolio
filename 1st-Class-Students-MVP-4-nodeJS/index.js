// our libraries
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session'); // Add this line to use session

// create instance of express object
const app = express();
const port = 8000;

// for bodyparsing get and post commands
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'appuser',
    password: 'app2027',
    database: 'taskhive'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// start cookies for continued session after login
app.use(session({
    secret: 'ProductivitySoul',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
}));

// Set up css and js
app.use(express.static(__dirname + '/public'));

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

// Requires the main.js file inside the routes folder passing in the Express app and data as arguments.  All the routes will go in this file
require("./routes/main")(app);
// require("./linearhasher");

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
