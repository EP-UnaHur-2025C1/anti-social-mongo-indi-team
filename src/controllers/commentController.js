const Comment = require('../models/comment')
const Post = require('../models/post')

const obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comment.find().select('text')
        if(!comentarios){
            return res.status(404).json({message: 'No se encontraron comentarios'})
        }
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const crearComentario = async (req, res) => {
    try {
        const { postId, userId, text } = req.body
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({error: "Publicación no encontrada"})
        }
        const comentario = new Comment({ postId, userId, text })
        await comentario.save()
        post.comment.push(comentario._id)
        await post.save()
        res.status(201).json({ message: "Comentario creado exitosamente", comentario })

    } catch (error) {
        res.status(400).json({error: "Error al crear el comentario"})
    }
}

const actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params
        const { text } = req.body

        await Comment.findByIdAndUpdate(id, { text }, {new: true, runValidators: true})
        res.status(200).json({ message: "Comentario actualizado exitosamente"});

   } catch (error) {
       res.status(500).json({ error: error.message})
   }
}


const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params
        await Comment.findByIdAndDelete(id)
        res.status(204).json({message: 'Comentario eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


module.exports = {
    obtenerComentarios,
    crearComentario,
    actualizarComentario,
    eliminarComentario
}