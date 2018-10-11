var express = require("express"),
    app = express(),
    bodyPaser = require("body-parser"),
    mongoose = require("mongoose");

app.listen("3000", process.env.IP, function() {
    console.log("server is up on 3000")
})