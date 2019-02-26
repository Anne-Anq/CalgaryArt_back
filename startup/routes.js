const express = require("express");
const CORS = require("../middleware/CORS");

const users = require("../routes/users");
const venues = require("../routes/venues");
const artists = require("../routes/artists");
const register = require("../routes/register");


module.exports = app => {
    app.use(express.json());
    app.use(CORS);
    app.use("/api/register", register);
    app.use("/api/users", users);
    app.use("/api/venues", venues);
    app.use("/api/artists", artists);
};
