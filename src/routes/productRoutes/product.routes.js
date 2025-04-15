const express = require('express')
const productRoutes = express.Router()
const productController = require('../../controller/product.controller')
const { catchAsyncErrors, validationCatches } = require('../../utils/tryCatch')
const { addProductValidation, editProductValidation } = require('../../utils/validations.yup')
const  upload = require('../../utils/multer')

productRoutes.post('/add-product', (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, catchAsyncErrors(productController.addProduct));

productRoutes.get(
    '/get-products',
    catchAsyncErrors(productController.getAllProducts)
)

productRoutes.put(
    '/edit-product/:id',
    validationCatches(editProductValidation),
    catchAsyncErrors(productController.editProduct)
)

productRoutes.delete(
    '/delete-product/:id',
    catchAsyncErrors(productController.deleteProduct)
)

module.exports = productRoutes
