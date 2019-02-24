const express = require("express");

const users = require("../routes/users");
const venues = require("../routes/venues");
const artists = require("../routes/artists");


module.exports = app => {
    app.use(express.json());
    app.use("/api/users", users);
    app.use("/api/venues", venues);
    app.use("/api/artists", artists);
};
