const { Router } = require('express')
const router = Router()
const postController = require('../controllers/postController')


//rutas
router.get("/", postController.obtenerPosts)
router.post("/", postController.crearPost)
router.put("/:id", postController.actualizarPost)
router.put("/:id/images/:imageId", postController.actualizarImagenPost)  //CAMBIO EN ESTA


router.delete("/:id", postController.eliminarPost)
router.delete("/:id/images/:imageId", postController.eliminarImagenPost) //CAMBIO EN ESTA


module.exports = router;