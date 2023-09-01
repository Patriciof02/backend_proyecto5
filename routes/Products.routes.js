const express = require('express')
const router = express.Router()
const {getProducts, createProduct, updateProduct, deleteProduct, getProductById} = require('../controlers/Product.controlers')



router.get('/', getProducts)
router.post('/', createProduct)
router.put('/', updateProduct)
router.delete('/', deleteProduct)
router.get('/:_id', getProductById)

module.exports = router