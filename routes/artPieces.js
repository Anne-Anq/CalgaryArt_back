const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/imageUpload");
const config = require('config');
const baseURL = config.get('baseURL');

//api/artPieces
//protect passwords


//ALL ART_PIECES
router.get('/', function (req, res, next) {
    try {
        const query = `SELECT id, ap_name, ap_picture_URL FROM  art_pieces`
        res.locals.connection.query(query
            , function (error, results, fields) {
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



//ONE ART_PIECE
router.get('/:ap_id', function (req, res, next) {
    try {
        const query = `SELECT 
    f_name, l_name, ap_name, ap_description, ap_price, ap_picture_URL, artist_id, ap_id, venue_id, 
    b_name, date_from, date_to, exhibitions.id AS exhibition_id, users.avatar_URL
    FROM users 
    JOIN artists ON users.id = artists.user_id 
    JOIN art_pieces ON artists.id = art_pieces.artist_id
    JOIN exhibitions ON art_pieces.id = exhibitions.ap_id
    JOIN venues ON exhibitions.venue_id = venues.id
    WHERE art_pieces.id =${req.params.ap_id};`
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


//POST ART_PIECE
router.post('/', imageUpload('ap_picture'), function (req, res, next) {
    try {
        const art_piece = {
            ap_name: req.body.ap_name ? req.body.ap_name : 'unnamed',
            ap_description: req.body.ap_description ? req.body.ap_description : '',
            ap_price: req.body.ap_price ? req.body.ap_price : 0,
            ap_picture_URL: req.file ? `${baseURL}${req.file.filename}` : '',
            artist_id: req.body.artist_id
        };
        res.locals.connection.query('INSERT INTO art_pieces SET ?', art_piece, function (error, results, fields) {
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


//UPDATE
router.put('/:ap_id', imageUpload('ap_picture'), function (req, res, next) {
    try {
        const query = `UPDATE art_pieces
    SET  ?
    WHERE id = ?`;
        const art_piece = {
            ap_name: req.body.ap_name ? req.body.ap_name : 'unnamed',
            ap_description: req.body.ap_description ? req.body.ap_description : '',
            ap_price: req.body.ap_price ? req.body.ap_price : 0,
            ap_picture_URL: req.file ? `${baseURL}${req.file.filename}` : '',
            artist_id: req.body.artist_id
        };

        res.locals.connection.query(query, [art_piece, req.params.ap_id], function (error, results, fields) {
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


//DELETE
router.delete('/:ap_id', function (req, res, next) {
    try {
        res.locals.connection.query('DELETE FROM art_pieces WHERE id = ?', req.params.ap_id, function (error, results, fields) {
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