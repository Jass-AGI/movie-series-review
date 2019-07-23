var express     = require("express"),
    bodyparser  = require("body-parser"),
    methodover  = require("method-override"),
    app         = express(),
    indexrouter = require("./routes/index");

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodover("_method"));
app.use(express.static("public"));

app.use(indexrouter);

app.listen(4000,function(){
    console.log("SERVER HAS STARTED");
})
