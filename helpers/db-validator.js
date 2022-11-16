const Rol = require('../models/rol')
const User = require('../models/user')
const Cerveza = require('../models/cerveza')

const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
    if (!existeRol) {
        throw new Error(`Rol ${rol} not exists in database`)
    }
}
const emailExist = async(Email)=> {
    const emailDb = await User.findOne({ Email }); 
    if(emailDb){
        throw new Error(`Email ${Email} already exists in database`)
        // return res.status(400).json({
        //     "msg": "El email ya está registrado"
        // })
    }
}


module.exports = {isValidRol, emailExist}