const Rol = require('../models/rol')
const User = require('../models/user')
const Cerveza = require('../models/cerveza')

//USERS
const isValidRol = async (Rol = '')=> {
	const existeRol = await Rol.findOne({ Rol })
    if (!existeRol) {
        throw new Error(`Rol ${Rol} not exists in database`)
    }
}
const emailExists = async(Email)=> {
    const emailDb = await User.findOne({ Email }); 
    if(emailDb){
        throw new Error(`Email ${Email} already exists in database`)
        // return res.status(400).json({
        //     "msg": "El email ya está registrado"
        // })
    }
}
const userExists = async (id) =>{
    const idDb = await User.findById(id); //con id (no es el nombre original) se hace con findById
    if(!idDb){
        throw new Error(`El usuario con id ${id} no existe`)
    }
}

//CERVEZAS
const priceRange = async(Price)=>{
    const min = 0.20;
    const max = 10;
    if(Price < min || Price > max){
        throw new Error(`El precio ${Precio} es mayor que ${max} y menor que ${min}`)
    }
}
const beerExists = async(id)=>{
    const idDb = await Cerveza.findById(id);
    if(!idDb){
        throw new Error(`La cerveza con id ${id} no existe`)
    }
}

//EXPORTS USER
module.exports = {isValidRol, emailExists, userExists}
//EXPORT BEER
module.exports = {priceRange, beerExists}