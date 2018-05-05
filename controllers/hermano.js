"use strict"

var User = require("../models/user");
var Hermano = require("../models/hermano");

var moment = require("moment");

function pruebas(req, res) {
    res.status(200).send({ mensaje: "probando", user: req.user });
    /*CON USUARIO
    res.status(200).send({ mensaje: "probando", user : req.user });
    */
}

function agregarHermano(req, res) {
    var hermano = Hermano();
    var dia = moment().format("DD-MM-YY");
    hermano.viernes = 0;
    hermano.sabado = 0;
    hermano.domingo = 0;
    hermano.dia = dia;
    hermano.monto = 0;

    if (req.body.name && req.body.surname) {
        hermano.name = req.body.name;
        hermano.surname = req.body.surname;
        

        if (req.body.monto)
            hermano.monto = req.body.monto;
        if (req.body.viernes)
            hermano.viernes = req.body.viernes;
        if (req.body.sabado)
            hermano.sabado = req.body.sabado;
        if (req.body.domingo)
            hermano.domingo = req.body.domingo;

        hermano.user = req.user.sub;

        hermano.save((err, hermanoStored) => {
            if (err)
                res.status(500).send({ mensaje: "Error en el sv" });
            else {
                if (!hermanoStored)
                    res.status(404).send({ mensaje: "Hermano NO guardado" });
                else
                    res.status(200).send({ mensaje: "Hermano GUARDADO", hermano: hermanoStored });
            }
        });
    }
    else res.status(200).send({ mensaje: "NO llegan datos" });
}

function listarHermanos(req, res) {
    Hermano.find({})
        .populate({ path: 'user', options: { select: {  user: 1 } } })
        .sort({ surname : 1 })
        .exec((err, hermano) => {
            if (err)
                res.status(500).send({ mensaje: "ERROR EN LA PETICION" });
            else {
                if (!hermano)
                    res.status(404).send({ mensaje: "No hay hermanos" });
                else
                {
                    res.status(200).send({ hermano });
                }
            }
        });
}

function unHermano(req, res) {
    var hermanoId = req.params.id;

    Hermano.findById(hermanoId)
        .populate({ path: 'user', options: { select: { name: 1, surname: 1, user: 1 } } })
        .exec((err, hermano) => {
            if (err)
                res.status(500).send({ mensaje: "ERROR EN LA PETICION" });
            else {
                if (!hermano)
                    res.status(404).send({ mensaje: "El hermano no existe" });
                else
                    res.status(200).send({ hermano });
            }
        });
}

function actualizarHermano(req, res) {
    var hermanoId = req.params.id;
    var update = req.body;

    Hermano.findByIdAndUpdate(hermanoId, update, { new: true }, (err, hermanoUpdate) => {
        if (err)
            res.status(500).send({ mensaje: "ERROR EN LA PETICION" });
        else {
            if (!hermanoUpdate)
                res.status(404).send({ mensaje: "El hermano no se actualizo" });
            else
                res.status(200).send({ mensaje: "Hermano actualizado",hermanoUpdate, user: req.user.user });
        }
    })
}

function eliminarHermano(req, res) {
    var hermanoId = req.params.id;

    Hermano.findByIdAndRemove(hermanoId, (err, resp) => {
        if (err)
            res.status(500).send({ mensaje: "ERROR EN LA PETICION" });
        else {
            if (!resp)
                res.status(404).send({ mensaje: "El hermano no se elimino" });
            else
                res.status(200).send({ mensaje : "Hermano Eliminado", user: req.user.user });
        }
    });
}

module.exports = {
    pruebas,
    agregarHermano,
    listarHermanos,
    unHermano,
    actualizarHermano,
    eliminarHermano
};
