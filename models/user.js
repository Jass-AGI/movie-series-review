var mongoose            = require("mongoose"),
    passlocalmongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        wishlist: {type : Array , default: [{name:"ABCDEF",key:"ABCDEF"}]}
    });
 
UserSchema.plugin(passlocalmongoose);

module.exports = mongoose.model("User",UserSchema); 
