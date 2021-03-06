const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/imageUpload");
const config = require('config');
const baseURL = config.get('baseURL');
const mysqlLib = require("mysqlLib");


mysqlLib.getConnection(function (err, mclient) {
    router.post('/', imageUpload('avatar'), function (req, res, next) {
        const user = {
            email: req.body.email,
            hashed_password: req.body.password,//implement security
            f_name: req.body.f_name ? req.body.f_name : '',
            l_name: req.body.l_name ? req.body.l_name : '',
            avatar_URL: req.file ? `${baseURL}${req.file.filename}` : ''
        };
        mclient.query('INSERT INTO users SET ?', user, function (error, results, fields) {
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