const mongoose = require('mongoose')
const generateToken = require('../helpers/generateToken')
const hashPassword = require('../helpers/hashPassword')
const Product = mongoose.model('Product')



const createProduct = async (req, res) => {
    const {productname, price, description, image} = req.body

    try{
        const product = new Product({
            productname,
            description,
            price,
            image

        })
        const resp = await product.save() 
        
        
        console.log(resp)
        return res.status(201).json({
            message : 'Product Created',
            resp
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            message:'internal servel error',
            detail: error,
        })
        
    }
    
}

const getProducts = async (req, res) => {
    try {
        const resp = await Product.find()
        return res.status(200).json({
            message:'ok ',
            detail: resp
        })

    }catch(error){
        return res.status(500).json({
            message:'internal servel error',
            detail: error,

    })
}
}


const updateProduct = async (req, res) => {
    const {_id, productUpdated} = req.body
    console.log(_id, productUpdated)
    try {
        const resp = await Product.findByIdAndUpdate(_id,productUpdated,{new:true})
        return res.status(200).json({
            message:'ok product updated',
            detail: resp
        })

    }catch(error){
        // console.log(error.description)
        return res.status(500).json({
            message:'internal servel error',
            detail: error,

    })
}
}
const deleteProduct = async (req, res) => {
    const {_id} =req.body
    try {
        const resp = await Product.findByIdAndDelete(_id)
        return res.status(200).json({
            message:'ok',
            detail: resp
        })

    }catch(error){
        return res.status(500).json({
            message:'internal servel error',
            detail: error,

    })
}
}


const getProductById = async (req, res) =>{
    const {_id} = req.params
    try {
        const product = await Product.findOne({_id})
        if(product){
            return res.status(200).json({
                message:'ok',
                detail: product
            })
        }
        return res.status(404).json({
            message:'not found'
        })}

        catch (error){
            return res.status(500).json({
                message:'server error'
            })
        
}

    
}



module.exports ={
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductById

}