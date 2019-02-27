const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const config = require('config');
const dbConfig = process.env.PORT ? DATABASE_URL : config.get('Customer.dbConfig');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection("mysql://b7c5948e745707:2e6359e3@us-cdbr-iron-east-03.cleardb.net/heroku_be2345cb5a88ff6?reconnect=true");
    res.locals.connection.connect();
    next();
});
app.use(express.static('uploads'))
app.use(express.json());
require("./startup/routes")(app);

let port = process.env.PORT || 8080;

app.set('port', port);
app.listen(port, function () {
    console.log(`Server running on ${port}!`);
});