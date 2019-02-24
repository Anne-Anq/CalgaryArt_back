const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass',
    database: 'calgary_art',
    insecureAuth: true
});

app.get("/", function (req, res) {
    // Find count of users in DB
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function (err, results) {
        // if (err) throw err;
        var count = results[0].count;
        res.send(count);
    });
});

app.listen(8080, function () {
    console.log("Server running on 8080!");
});