const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    img: {
        type: String
    }
})

const Bar = mongoose.model('Bar', BarSchema);
module.exports = Bar;