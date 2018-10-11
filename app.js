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
app.get("/", function(req, res) {
    res.redirect("/blogs");
})
// INDEX ROUTE
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, success) {
        if (err) {
            console.log("There was an error: ", err);
        } else {
            console.log("All went fine");
            res.render("index", {blogs: success});
        }
    })
});
// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE

app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog, function(err, success) {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs")
        }
    })
});

// SHOW ROUTE

app.get("/blogs/:id", function(req, res) {
    var id = req.params.id;
    Blog.findById(id, function(err, success) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: success});
        }
    })
})



app.listen("3001", process.env.IP,  function() {
    console.log("server is up on 3001")
})