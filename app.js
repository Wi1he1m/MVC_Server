var express = require('express'),
    app     = express();
    
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(res,req){
    res.render("app");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server up and running!");
});
