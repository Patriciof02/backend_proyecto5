require('dotenv').config()
require('./models/User.model')
require('./models/Product.model')
const userRoutes = require('./routes/User.routes')
const productRoutes = require('./routes/Products.routes')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URI + 'tienda')

const port =process.env.PORT

const corsOptions = {
    origin:process.env.FRONTEND_URL,
    optionsSuccessStatus:200

}

// const User = mongoose.model('User',{
//     username:String,
//     password:String
// })
app.use(cors(corsOptions))
app.use(express.json())

app.use('/users',userRoutes) //redireccionamiento al archivo user.routes

app.use('/products',productRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({
     mensaje:'ruta get'
    })
})
app.post('/', (req,res)=>{

    res.status(200).json({
        mensaje:'ruta post',
       })
})

app.put('/', (req,res)=>{
    res.status(200).json({
        mensaje:'ruta put'
       })
})

app.delete('/', (req,res)=>{
    res.status(200).json({
        mensaje:'ruta delete'
       })
})


app.listen(port, ()=>{
    console.log(`servidor escuchando en el puerto ${port}`)
})