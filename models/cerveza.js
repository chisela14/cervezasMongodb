const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CervezaSchema = new Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    Descripción: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        
    },
    Graduación: {
        type: String,
        required: [true, 'La graduación es obligatoria'],
    },
    Envase: {
        type: String,
    },
    Precio: {
        type: String,
        required: true
    },
});

const Cerveza = mongoose.model('Cerveza', CervezaSchema);
module.exports = Cerveza;