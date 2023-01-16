const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CervezaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    degree: {
        type: String,
        required: [true, 'La graduación es obligatoria'],
    },
    packaging: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

const Cerveza = mongoose.model('Cerveza', CervezaSchema);
module.exports = Cerveza;