const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarSchema = new Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    Dirección: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    }
})

const Bar = mongoose.model('Bar', BarSchema);
module.exports = Bar;