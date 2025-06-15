const mongoose = require('mongoose')

const tagShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la etiqueta es obligatorio'],
        unique: [true, 'Ya existe etiqueta con ese nombre']
    }
})

module.exports = mongoose.model('Tag', tagShema)