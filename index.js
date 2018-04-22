"use strict"

var mongoose = require("mongoose");
var app = require("./app");
var port = process.env.PORT || 3000;
mongoose.connect("mongodb://julianmartire1:martirekpo123@ds253889.mlab.com:53889/transporte", (err, res) => {
    if (err)
        throw err;
    else {
        console.log("DB OK");
        app.listen(port, () => {
            console.log("Server OK");
        });
    }
})