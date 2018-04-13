var express                 = require('express'),
    app                     = express(),
    bodyParser              = require('body-parser'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    Comment                 = require("./models/comment"),
    Campground              = require("./models/campground"),
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");
    
mongoose.connect("mongodb://localhost/yelpkaempfen_v6");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Short cuts make long delays",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
              res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
        Campground.create(req.body.campground, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
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
            res.render("campgrounds/show", {campground: dbCampground});
        }
    });
});

// COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground id and name
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            //pass campground through to ejs file
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //look up campground with id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.send("I'm sorry, but we could not find your campsite, please try again");
            } else {
            //create new comment
                Comment.create(req.body.comment, function(err, comment){
                    if(err){
                    console.log(err);
                    res.send("I'm sorry, there were issues posting your comment. Please try again");
                } else {
                    //connect new comment to campsite
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// AUTH ROUTES =====================
// registration form
app.get("/register", function(req, res){
    res.render("register");
});
//registration post
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN FORM
app.get("/login", function(req, res){
    res.render("login");
});
// LOGIN HANDLING
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server up and running!");
});