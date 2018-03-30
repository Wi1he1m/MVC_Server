var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/yelpkaempfen");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var campgroundSchema = new mongoose.Schema({
    site: String,
    url: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//       site:
//       url: 
        
//     }, function(error, campground){
//         if(error){
//             console.log(error);
//         } else {
//             console.log(campground);
//         }
//     });

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //get campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
              res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var site = req.body.site,
        url  = req.body.url,
        newCampground = {site: site, url: url};
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
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server up and running!");
});
