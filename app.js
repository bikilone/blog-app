var express = require("express"),
    app = express(),
    bodyPaser = require("body-parser"),
    mongoose = require("mongoose");

// app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyPaser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blog");

/// mongose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);




// ROUTES 

app.get("/blogs", function(req, res) {
    res.render("index");
})



app.listen("3001", process.env.IP,  function() {
    console.log("server is up on 3001")
})