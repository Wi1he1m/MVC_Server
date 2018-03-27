var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    campgrounds = [
        {site: "Lake Wanna-Hock-a-Loogie" , url:"http://www.lake-grapevine.com/wp-content/uploads/2012/03/Campsite-4-at-Murrell-Park.jpg" },
        {site: "Stony Brook", url: "https://static1.squarespace.com/static/577db0cc414fb5812b97943a/577db56d37c581b33317be6a/5782d660725e25016e620b12/1468192913301/WATERFRONT+3.jpg"},
        {site: "Turn Back Canyon", url: "https://img.purch.com/h/1400/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA1NS85MDAvb3JpZ2luYWwvYnJ5Y2Utd2FsbC1zdHJlZXQuanBn"},
        {site: "Lake Wanna-Hock-a-Loogie" , url:"http://www.lake-grapevine.com/wp-content/uploads/2012/03/Campsite-4-at-Murrell-Park.jpg" },
        {site: "Stony Brook", url: "https://static1.squarespace.com/static/577db0cc414fb5812b97943a/577db56d37c581b33317be6a/5782d660725e25016e620b12/1468192913301/WATERFRONT+3.jpg"},
        {site: "Turn Back Canyon", url: "https://img.purch.com/h/1400/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA1NS85MDAvb3JpZ2luYWwvYnJ5Y2Utd2FsbC1zdHJlZXQuanBn"},
        {site: "Lake Wanna-Hock-a-Loogie" , url:"http://www.lake-grapevine.com/wp-content/uploads/2012/03/Campsite-4-at-Murrell-Park.jpg" },
        {site: "Stony Brook", url: "https://static1.squarespace.com/static/577db0cc414fb5812b97943a/577db56d37c581b33317be6a/5782d660725e25016e620b12/1468192913301/WATERFRONT+3.jpg"},
        {site: "Turn Back Canyon", url: "https://img.purch.com/h/1400/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA1NS85MDAvb3JpZ2luYWwvYnJ5Y2Utd2FsbC1zdHJlZXQuanBn"}
        ];
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
   res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var site = req.body.site,
        url  = req.body.url,
        newCampground = {site: site, url: url};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server up and running!");
});
