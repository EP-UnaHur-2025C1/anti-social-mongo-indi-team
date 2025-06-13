const { Router } = require('express')
const router = Router()
const postController = require('../controllers/userController')
const postMiddleware = require('../middlewares/postMiddleware')

//rutas
router.get("/", postController.obtenerPosts)
router.post("/", postController.crearPost)
router.put("/:id", postMiddleware.existePost, postController.actualizarPost)
router.put("/:id/imagenes/:imageId", postMiddleware.existePost, postController.actualizarImagenesPost)
router.delete("/:id", postController.eliminarPost)
router.delete("/:id/imagenes/:imageId", postController.eliminarImagenPost)

module.exports = router;