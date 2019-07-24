var mongoose            = require("mongoose"),
    passlocalmongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username: String,
        password: String
    });

UserSchema.plugin(passlocalmongoose);

module.exports = mongoose.model("User",UserSchema); 
