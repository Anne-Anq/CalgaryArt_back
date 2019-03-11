const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/imageUpload");
const mysqlLib = require("mysqlLib");

//api/artists
//protect passwords


mysqlLib.getConnection(function (err, mclient) {
    //GET ALL ARTISTS
    router.get('/', function (req, res, next) {
        const sql = 'SELECT artists.id, user_id, f_name, l_name, avatar_URL FROM artists JOIN users ON artists.user_id = users.id';
        mclient.query(sql, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        })
    });
    //GET ONE ARTIST
    router.get('/:artist_id', function (req, res, next) {
        const sql = `SELECT 
                artist_id, user_id, ap_name,art_pieces.id AS ap_id, ap_picture_URL, ap_price, ap_description,
                avatar_URL, f_name, l_name, bio
                FROM users 
                LEFT JOIN artists ON users.id = artists.user_id 
                LEFT JOIN art_pieces ON artists.id = art_pieces.artist_id
                WHERE artists.id =${req.params.artist_id};`;
        mclient.query(sql, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    });
    //POST ONE ARTIST
    router.post('/', function (req, res, next) {
        const artist = {
            user_id: req.body.user_id,
            bio: req.body.bio ? req.body.bio : ''
        };
        mclient.query('INSERT INTO artists SET ?', artist, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    });
    //UPDATE ARTIST
    router.put('/:artist_id', imageUpload('avatar'), function (req, res, next) {
        const query = `UPDATE artists
        SET  ?
        WHERE id = ?`;
        const artist = {
            user_id: req.body.user_id,
            bio: req.body.bio ? req.body.bio : ''
        };
        mclient.query(query, [artist, req.params.artist_id], function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    });
    //UPDATE ARTIST
    router.put('/:artist_id', imageUpload('avatar'), function (req, res, next) {
        const query = `UPDATE artists
        SET  ?
        WHERE id = ?`;
        const artist = {
            user_id: req.body.user_id,
            bio: req.body.bio ? req.body.bio : ''
        };
        mclient.query(query, [artist, req.params.artist_id], function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    });
    //DELETE ARTIST
    router.delete('/:artist_id', function (req, res, next) {
        mclient.query('DELETE FROM artists WHERE id = ?', req.params.artist_id, function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            }
        });
    });
});

module.exports = router;