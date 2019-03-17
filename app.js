const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'))
app.use(express.json());
require("./startup/routes")(app);

let port = process.env.PORT || 8080;

app.set('port', port);
app.listen(port, function () {
    console.log(`Server running on ${port}!`);
});