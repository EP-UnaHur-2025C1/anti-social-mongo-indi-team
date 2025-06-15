const Post = require('../models/post');
const Post_Images = require('../models/Post_Images');

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find().select('user description');
        if(!posts){
            res.status(204).json({message: 'No hay contenido' })
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener las publicaciones'})
    }
}


const crearPost = async (req, res) => {
  try {
    const { userId, description } = req.body

    const nuevoPost = new Post({
      user: userId,
      description
    });
    await nuevoPost.save();

    if (req.files && req.files.length > 0) {
      const imagenes = req.files.map(file => ({
        postId: nuevoPost._id,
        imageUrl: file.path
      }));

      const imagenesGuardadas = await Post_Images.insertMany(imagenes);

      nuevoPost.images = imagenesGuardadas.map(img => img._id);
      await nuevoPost.save();
    }
    const postConImagenes = await Post.findById(nuevoPost._id)
      .populate('images');

    return res.status(201).json({message: "Publicación creada exitosamente", postConImagenes});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
}

const actualizarPost = async (req, res) => {
    try {
        const { id } = req.params
        const postActualizado = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        await Post_Images.deleteMany({
            postId: id
        })

        if (description) {
        postActualizado.description = description;
        await postActualizado.save();
        }

        if(imagenes.length > 0){
            const imagenesPost = imagenes.map( url => ({
                postId: id,
                imageUrl: url.imageUrl
            }))
            await Post_Images.insertMany(imagenesPost)
            await postActualizado.save()
        }

        const post = await Post.findByIdAndUpdate(id, imagenesPost, {
            new: true,
            runValidators: true
        }).populate('images', 'imageUrl')
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el autor', error })
    }
}

const eliminarPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await findByIdAndDelete(id)
        
        await Post_Images.deleteMany({
            postId: id
        })

        res.status(200).json({message: 'Publicación eliminada', post});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la publicación'});
    }
}

const eliminarImagenPost = async (req, res) => {
    try {
        const { id, imageId } = req.params
        const post = await Post_Images.findByIdAndDelete(id)
        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'});
        }

        post.imagenes.pull({
            _id: imageId
        })

        await post.save()

        res.status(200).json({message: 'Imagen eliminada exitosamente'})

    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la imagen'})
    }
}

const actualizarImagenPost = async (req, res) => {
    try {
        const { id, imageId } = req.params
        const { imageUrl } = req.body

        const post = await Post.findById(id);
        
        const imagenesActualizadas = post.images.id(imageId)
        if(!imagenesActualizadas){
            return res.status(404).json({message: 'Imagen no encontrada'})
        }
        imagenesActualizadas.imageUrl = imageUrl

        await post.save()
        res.status(200).json({message: 'Imagen actualizada exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar la publicación'})
    }
}


module.exports = {
    obtenerPosts,
    crearPost,
    actualizarPost,
    eliminarPost,
    eliminarImagenPost,
    actualizarImagenPost
}