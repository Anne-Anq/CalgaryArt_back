const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/imageUpload");
const config = require('config');
const baseURL = config.get('baseURL');

//api/artists
//protect passwords


//ALL ARTISTS
router.get('/', function (req, res, next) {
    try {
        res.locals.connection.query('SELECT artists.id, f_name, l_name, avatar_URL FROM artists JOIN users ON artists.user_id = users.id'
            , function (error, results, fields) {
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



//ONE ARTIST
router.get('/:artist_id', function (req, res, next) {
    try {
        const query = `SELECT 
    artist_id, ap_name,art_pieces.id AS ap_id, ap_picture_URL, ap_price, ap_description,
    avatar_URL, f_name, l_name, bio
    FROM users 
    LEFT JOIN artists ON users.id = artists.user_id 
    LEFT JOIN art_pieces ON artists.id = art_pieces.artist_id
    WHERE artists.id =${req.params.artist_id};`
        res.locals.connection.query(query, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    } catch (error) {
        console.log(err)
    }

});



// //Add an artist from user id
router.post('/', function (req, res, next) {
    try {
        const artist = {
            user_id: req.body.user_id,
            bio: req.body.bio ? req.body.bio : ''
        };
        res.locals.connection.query('INSERT INTO artists SET ?', artist, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    } catch (error) {
        console.log(err)
    }

});



//UPDATE ARTIST
router.put('/:artist_id', imageUpload('avatar'), function (req, res, next) {
    try {
        const query = `UPDATE artists
    SET  ?
    WHERE id = ?`;
        const artist = {
            user_id: req.body.user_id,
            bio: req.body.bio ? req.body.bio : ''
        };
        res.locals.connection.query(query, [artist, req.params.artist_id], function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    } catch (error) {
        console.log(err)
    }

});



//DELETE ARTIST
router.delete('/:artist_id', function (req, res, next) {
    try {
        res.locals.connection.query('DELETE FROM artists WHERE id = ?', req.params.artist_id, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    } catch (error) {
        console.log(err)
    }

});



module.exports = router;