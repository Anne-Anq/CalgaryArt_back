const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/imageUpload");
const config = require('config');
const baseURL = config.get('baseURL');
//protect passwords

router.get('/', function (req, res, next) {
    try {
        res.locals.connection.query('SELECT * FROM users', function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    } catch (error) {
        console.log(error)
    }

});
router.get('/:user_id', function (req, res, next) {
    try {
        res.locals.connection.query(`SELECT users.id AS user_id, email, f_name, l_name, avatar_URL, users.created_at, artists.id AS artist_id, bio
    FROM users 
    LEFT JOIN artists ON users.id = artists.user_id    
    WHERE users.id =${req.params.user_id}`, function (error, results, fields) {
                if (error) {
                    res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
                }
            });
    } catch (error) {
        console.log(error)
    }

});
router.put('/:user_id', imageUpload('avatar'), function (req, res, next) {
    try {
        const query = `UPDATE users
    SET  ?
    WHERE id = ?`;
        const user = {
            email: req.body.email,
            hashed_password: req.body.password,//implement security
            f_name: req.body.f_name ? req.body.f_name : '',
            l_name: req.body.l_name ? req.body.l_name : '',
            avatar_URL: req.file ? `${baseURL}${req.file.filename}` : ''
        };

        res.locals.connection.query(query, [user, req.params.user_id], function (error, results, fields) {

            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    } catch (error) {
        console.log(error)
    }

});
router.delete('/:user_id', function (req, res, next) {
    try {
        res.locals.connection.query('DELETE FROM users WHERE id = ?', req.params.user_id, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;