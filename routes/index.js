var express     = require("express"),
    router      = express.Router({mergeParams: true})
    request     = require("request")
    json        = require("JSON");

router.get("/",function(req,res){
    res.redirect("/movie_ratings");
});

router.get("/movie_ratings",function(req,res){
    request.get("http://www.omdbapi.com/?s=breaking&apikey=7669c24",function(error,response,body){
            if(!error && response.statusCode == 200){
                res.render("landing",{movies:json.parse(body)});
            }else{
                console.log(error);
                res.send("SOMETHING WENT WRONG");
            }
        });
});

router.get("/movie_ratings/:id",function(req,res){
    request.get("http://www.omdbapi.com/?apikey=7669c24&i="+req.params.id,function(error,response,body){
        if(!error && response.statusCode == 200){
            res.render("show",{movie:json.parse(body)});
        }else{
            console.log(error);
            res.send("SOMETHING WENT WRONG");
        }
    });
});

router.post("/movie_ratings/:name",function(req,res){
    res.render("results");
});

module.exports=router;