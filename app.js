"use strict"

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//RUTAS
var user_routes = require("./routes/user");
var hermano_routes = require("./routes/hermano");

//MIDDLEWARES BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORSE
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://transportesq.000webhostapp.com,http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization, X-API-KEY, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    next();
  });
  
//RUTAS BASE
app.use("/",user_routes);
app.use("/",hermano_routes);

module.exports = app;
