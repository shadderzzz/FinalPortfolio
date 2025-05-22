const mysql = require('mysql');

const db = mysql.createConnection ({
  host: 'localhost',
  user: 'appuser',
  password: 'app2027',
  database: 'taskhive'
});   

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');

  // Grant privileges to a user
  const grantQuery = "GRANT ALL PRIVILEGES ON taskhive.* TO 'appuser'@'localhost' IDENTIFIED BY 'password'";
  connection.query(grantQuery, (error, results, fields) => {
    if (error) {
      console.error('Error granting privileges:', error.message);
    } else {
      console.log('Privileges granted successfully.');
    }
    // Close the connection
    connection.end();
  });
});

module.exports = connection;
