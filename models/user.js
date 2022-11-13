const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    Nombre: {
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
    },
    Email: {
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    Contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;