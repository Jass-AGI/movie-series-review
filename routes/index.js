var express     = require("express"),
    router      = express.Router({mergeParams: true})
    request     = require("request")
    json        = require("JSON");

    // https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=don&api-key=YW9jPbcw6tTiFAycsRSZzL61v5Tl4CKA


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
            var movie=json.parse(body);
            console.log(movie.Title);
            request.get("https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=YW9jPbcw6tTiFAycsRSZzL61v5Tl4CKA&query="+movie.Title,function(error,response,body){
                if(!error && response.statusCode == 200){
                    res.render("show",{movie:movie,reviews:json.parse(body).results});
                }else{
                    console.log(error);
                    res.send("SOMETHING WENT WRONG");
                }
            });
        }else{
            console.log(error);
            res.send("SOMETHING WENT WRONG");
        }
    });
});

router.post("/movie_ratings/",function(req,res){
    request.get("http://www.omdbapi.com/?apikey=7669c24&s="+req.body.name,function(error,response,body){
        if(!error && response.statusCode == 200){
            res.render("landing",{movies:json.parse(body)});
        }else{
            console.log(error);
            res.send("SOMETHING WENT WRONG");
        }
    });
});

module.exports=router;