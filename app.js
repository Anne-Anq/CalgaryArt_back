const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const config = require('config');
const dbConfig = config.get('DATABASE_URL');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    try {
        res.locals.connection = mysql.createConnection(dbConfig);
        res.locals.connection.connect();
        console.log('now connected to ', dbConfig);
        next();
    } catch (err) {
        console.log(err)
    }

});
app.use(express.static('uploads'))
app.use(express.json());
require("./startup/routes")(app);

let port = process.env.PORT || 8080;

app.set('port', port);
app.listen(port, function () {
    console.log(`Server running on ${port}!`);
});