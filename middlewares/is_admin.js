"use strict"

exports.isAdmin = (req, res, next) =>{
    if(req.user.role != "ADMIN")
        return res.status(200).send({mensaje : "No tienes acceso"});
    
    next();
};