"use strict"

var express = require("express");
var UserController = require("../controllers/user");

var api = express.Router();
var md_auth = require("../middlewares/authenticated");

api.get("/prueba", md_auth.ensureAuth, UserController.pruebas);
api.post("/addUser", UserController.agregarUsuario);
api.post("/login", UserController.login);

module.exports = api;