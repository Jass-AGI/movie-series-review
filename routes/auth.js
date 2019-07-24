var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport"),
    router      = express.Router({mergeParams : true});

router.get("/login",function(req,res){
    // res.send("asfjhbsadfd");
    res.render("auth/login");
});


router.get("/signup",function(req,res){
    res.render("auth/signup");
});


router.post("/signup",function(req,res){
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            res.redirect("/signup");
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            })
        }
    });
});

router.post("/login",passport.authenticate(("local"),{
    successRedirect: "/", 
    failureRedirect: "/login"
}),function(req,res){});

router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
});

module.exports = router;