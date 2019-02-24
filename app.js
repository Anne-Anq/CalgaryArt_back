const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');

//put password in a config,js

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calgary_art'
    });
    res.locals.connection.connect();
    next();
});
app.use(express.json());
require("./startup/routes")(app);


app.listen(8080, function () {
    console.log("Server running on 8080!");
});