const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const config = require('config');
const dbConfig = config.get('Customer.dbConfig');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection(dbConfig);
    res.locals.connection.connect();
    next();
});
app.use(express.static('uploads'))
app.use(express.json());
require("./startup/routes")(app);


app.listen(8080, function () {
    console.log("Server running on 8080!");
});