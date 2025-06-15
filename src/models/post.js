const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Usuario obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post_Images'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

module.exports = mongoose.model('Post', postSchema)