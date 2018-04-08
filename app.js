var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
    
mongoose.connect("mongodb://localhost/yelpkaempfen_v3");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
seedDB();

app.get("/", function(req,res){
    res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
    //get campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
              res.render("index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var site = req.body.site,
        url  = req.body.url,
        desc = req.body.description,
        newCampground = {site: site, url: url, description: desc};
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
    //find campground with respective id
    Campground.findById(req.params.id).populate("comments").exec(function(err, dbCampground){
        if(err){
            console.log(err);
        } else {
            console.log(dbCampground);
        //render show template with campground in it
            res.render("show", {campground: dbCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server up and running!");
});