const Post = require('../models/post');

const existePost = async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if(!post){
        return res.status(404).json({message: 'Posteo no encontrado'})
    }
    next()
}


module.exports = existePost