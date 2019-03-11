const express = require("express");
const router = express.Router();
const mysqlLib = require("mysqlLib");

mysqlLib.getConnection(function (err, mclient) {
    router.get('/', function (req, res, next) {
        mclient.query('SELECT * FROM venues', function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    });
});
module.exports = router;