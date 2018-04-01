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
    url: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//       site: "Crushing Rock",
//       url:"https://www.photosforclass.com/download/pixabay-918954?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe034b9062df01c22d2524518b7444795ea76e5d004b0144397f5c57aa7e9b3_960.jpg&user=Free-Photos",
//       description:"Don't sleep too soundly, you may be crushed by a giant rock!"
        
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

app.get("/campgrounds/:id", function(req, res){
    //find campground with respective id
    Campground.findById(req.params.id, function(err, dbCampground){
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
