const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')


const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())


const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const post_ImagesRouter = require('./routes/post_ImagesRoutes')
const tagRouter = require('./routes/tagRoutes')
const commentRouter = require('./routes/commentRouter')

//rutas
app.use('/usuarios', userRouter)
app.use('/posts', postRouter)
app.use('/post_Images', post_ImagesRouter)
app.use('tags', tagRouter)
app.use('comments', commentRouter)


//Conexion a DB
connectDB()

app.listen(PORT, () =>{
    console.log(`la aplicacion esta corriendo en el puerto ${PORT}`)
})
