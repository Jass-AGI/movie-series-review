var express     = require("express"),
    bodyparser  = require("body-parser"),
    methodover  = require("method-override"),
    app         = express(),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    passlocal   = require("passport-local"),
    User        = require("./models/user"),
    indexrouter = require("./routes/index"),
    authrouter  = require("./routes/auth");

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodover("_method"));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/movie_review");

app.use(require("express-session")({
    secret:"be humble hella biatch sit down",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new passlocal(User.authenticate()));

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    return next();
});


app.use(indexrouter);
app.use(authrouter);

app.listen(4000,function(){
    console.log("SERVER HAS STARTED");
});
