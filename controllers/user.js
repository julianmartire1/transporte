"use strict"

var bcrypt = require("bcrypt-nodejs");

var User = require("../models/user");

var jwt = require("../services/jwt");

function pruebas(req, res) {
    res.status(200).send({ mensaje: "probando", user : req.user });
    /*
    CON USUARIO
    res.status(200).send({ mensaje: "probando", user : req.user });
    */
}

function agregarUsuario(req, res) {
    var user = new User();

    if (req.body.name && req.body.surname && req.body.password && req.body.user) {
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.user = req.body.user;
        user.role = "ADMIN";

        User.findOne({ user: user.user }, (err, unUser) => {
            if (err)
                res.status(500).send({ mensaje: "ERROR al comprobar" });
            else {
                if (!unUser) {
                    bcrypt.hash(req.body.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if (err)
                                res.status(500).send({ mensaje: "ERROR, no se pudo guardar el usuario" });
                            else {
                                if (!userStored)
                                    res.status(404).send({ mensaje: "No se registro el Usuario" });
                                else
                                    res.status(200).send({ mensaje: "Usuario Guardado" });
                            }
                        });
                    });
                }
                else
                    res.status(500).send({ mensaje: "El usuario ya existe" });
            }
        });
    }
    else res.status(200).send({ mensaje: "NO llegan datos" });
}
/*
function agregarHermano(req, res) {
    var hermano = new Hermano();

    if (req.body.name && req.body.surname && req.body.viernes && req.body.sabado && req.body.domingo) {
        hermano.name = req.body.name;
        hermano.surname = req.body.surname;
        hermano.viernes = req.body.viernes;
        hermano.sabado = req.body.sabado;
        hermano.domingo = req.body.domingo;


    }
    else res.status(200).send({ mensaje: "NO llegan datos" });
}*/

function login(req, res) {
    if (req.body.user && req.body.password) {
        User.findOne({ user: req.body.user }, (err, unUser) => {
            if (err)
                res.status(500).send({ mensaje: "ERROR al comprobar" });
            else {
                if (unUser) {
                    bcrypt.compare(req.body.password, unUser.password, (err, check) => {
                        if (err)
                            res.status(200).send({ mensaje: "Error al loguearse" });
                        else {
                            if (check)
                                res.status(200).send({ user : req.body.user , "token": jwt.createToken(unUser) });
                            else
                                res.status(200).send({ mensaje: "El usuario no pudo loguearse" });
                        }
                    })
                }
                else
                    res.status(404).send({ mensaje: "El usuario no existe" });
            }
        });
    }
    else res.status(200).send({ mensaje: "NO llegan datos" });
}

module.exports = {
    pruebas,
    agregarUsuario,
    login
};