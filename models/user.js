const { Schema, model} = require('mongoose');

const UserSchema = new Schema({
    Nombre: { //nombres en minúscula
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    Apellidos: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        
    },
    Username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
    },
    Email: {
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    Contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    Rol: { 
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    Status: {
        type: Boolean, 
        default: true
    },
    img: {
        type: String
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, Contraseña, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);