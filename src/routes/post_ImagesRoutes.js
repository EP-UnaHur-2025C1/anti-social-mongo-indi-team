const {Router} = require("express");
const router = Router();
const post_imagesController = require("../controllers/post_ImagesController")
const postMiddleware = require('../middlewares/postMiddleware') 

const { Post_Images } = require('../db/models')

router.get("/",  post_imagesController.obtenerImagenes);
router.post("/",  post_imagesController.crearImagenes);
router.put("/:id", postMiddleware.existePost(Post_Images.postId), post_imagesController.actualizarImagenes)
router.delete("/:id", postMiddleware.existePost(Post_Images.postId), post_imagesController.eliminarImagen)


module.exports = router;