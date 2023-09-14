const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productname:{
        type: String,
        require: true,
       
    },
    description:{
        type:String,
        require: true,
    },
    price:{
        type:String,
        require: true,
    },
    image: {
        data: Buffer,// Almacenar los bytes de la imagen
        contentType: String, // Tipo de contenido de la imagen (por ejemplo, 'image/jpeg')
    
    },
  

},{
    timestamps:true
})

const Product = mongoose.model('Product',ProductSchema)
module.exports = Product
