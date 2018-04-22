"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    user: String,
    password: String,
    role: String
});

module.exports = mongoose.model("User", UserSchema);