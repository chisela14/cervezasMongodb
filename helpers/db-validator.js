const Rol = require('../models/rol')

const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
		  if (!existeRol) {
			  throw new Error(`Rol ${rol} not exists in database`)
		  }
}
const isEmail = async(email = '')=> {
    const emailExist = await User.findOne({email}); 
    if(emailExist){
        throw new Error(`Email ${email} not exists in database`)
        // return res.status(400).json({
        //     "msg": "El email ya está registrado"
        // })
    }
}


module.exports = {isValidRol, isEmail}