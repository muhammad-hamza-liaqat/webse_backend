const statusCode = require('http-status-codes')
const Product = require("../models/productModel")
const { HTTPResponse, HTTPError } = require("../utils/response")

const addProduct = async (req, res) => {
    let response
    const { productTitle, productDescription, quantity, price } = req.body

    const product = new Product({
        productTitle,
        productDescription,
        quantity,
        price,
    })
    await product.save()

    response = new HTTPResponse("Product added successfully", product)
    return res.status(statusCode.CREATED).json(response)
}

const getAllProducts = async (req, res) => {
    let error, response
    const products = await Product.find({}, 'productTitle productDescription price quantity')
    if (!products) {
        error = new HTTPError("No products found", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    response = new HTTPResponse("Products fetched successfully", products)
    return res.status(statusCode.OK).json(response)
}

const editProduct = async (req, res) => {
    let error, response
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        error = new HTTPError("Product not found", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
    response = new HTTPResponse("Product updated successfully", updatedProduct)
    return res.status(statusCode.OK).json(response)
}

const deleteProduct = async (req, res) => {
    let error, response
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        error = new HTTPError("Product not found", statusCode.NOT_FOUND)
        return res.status(statusCode.NOT_FOUND).json(error)
    }
    await Product.findByIdAndDelete(id)
    response = new HTTPResponse("Product deleted successfully", statusCode.OK)
    return res.status(statusCode.OK).json(response)
}

module.exports = {
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct
}