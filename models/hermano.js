"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BrothersSchema = Schema({
    name: String,
    surname: String,
    viernes : Number,
    sabado : Number,
    domingo : Number,
    dia : String,
    monto : Number,
    user : { type : Schema.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Brothers", BrothersSchema);