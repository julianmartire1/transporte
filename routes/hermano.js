"use strict"

var express = require("express");
var HermanoController = require("../controllers/hermano");

var api = express.Router();
var md_auth = require("../middlewares/authenticated");
var md_admin = require("../middlewares/is_admin");

//api.get("/pruebaH", md_auth.ensureAuth, HermanoController.pruebas);
api.post("/hermano", [md_auth.ensureAuth, md_admin.isAdmin], HermanoController.agregarHermano);
api.get("/hermano", [md_auth.ensureAuth, md_admin.isAdmin], HermanoController.listarHermanos);
api.get("/hermano/:id", [md_auth.ensureAuth, md_admin.isAdmin], HermanoController.unHermano);
api.put("/hermano/:id", [md_auth.ensureAuth, md_admin.isAdmin], HermanoController.actualizarHermano);
api.delete("/hermano/:id", [md_auth.ensureAuth, md_admin.isAdmin], HermanoController.eliminarHermano);

module.exports = api;