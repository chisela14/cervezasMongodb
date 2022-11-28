const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

async function checkLogin(req = request, res = response) {
    const Contraseña = req.params.Contraseña
    //comprobar contraseña
    const salt = bcryptjs.genSaltSync();
    encriptada = bcryptjs.hashSync(Contraseña, salt);
    if(bcryptjs.compareSync(Contraseña, encriptada)){
        //comprobar email existe
        const Email = req.params.Email
        const userDb = await User.findOne({Email});
        if(!userDb){
            res.json({ message: `El correo no existe` })
        }else{
            if(userDb.Status == "inactive"){
               res.json({ message: `El usuario no está activo` }) 
            }
        }
    }else{
        res.json({ message: `La contraseña no es correcta` })
    }
}

module.exports =  {checkLogin};