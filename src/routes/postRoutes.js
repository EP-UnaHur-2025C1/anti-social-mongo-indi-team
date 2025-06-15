const { Router } = require('express')
const router = Router()
const postController = require('../controllers/postController')

//rutas
router.get("/", postController.obtenerPosts)
router.post("/", postController.crearPost)
router.put("/:id", postController.actualizarPost)
router.put("/:id/imagenes/:imageId", postController.actualizarImagenPost)
router.delete("/:id", postController.eliminarPost)
router.delete("/:id/imagenes/:imageId", postController.eliminarImagenPost)

module.exports = router;