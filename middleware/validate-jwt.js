const { request, response } = require('express');
const jwt = require("jsonwebtoken");

///request será igual para todas las peticiones, así que podemos añadirle atributos para acceder a ellos después
const validateJWT = async (req = request, res = response, next) => { 
    const token = req.header('x-token'); //cabecera: clave(x-token) - valor(token)
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try{                //jwt.verify()... devuelve payload
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
        const user = await user.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            })
        }
        if(!user.Status){
            return res.status(401).json({
                msg: 'Token no válido - usuario deshabilitado'
            })
        }
        req.user = user; //añado atributo user a request
        next();

    }catch(error){
        console.log(error);
    }

}

module.exports = {validateJWT};