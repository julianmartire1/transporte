"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "clave_secreta_transporte";

exports.createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        user: user.user,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30,"days").unix()
    };

    return jwt.encode(payload, secret);
};