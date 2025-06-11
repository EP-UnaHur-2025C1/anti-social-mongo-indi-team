const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const userRouter = require('./routes/userRoutes')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
//rutas
app.use('/usuarios', userRouter)

//Conexion a DB
connectDB()

app.listen(PORT, () =>{
    console.log(`la aplicacion esta corriendo en el puerto ${PORT}`)
})
