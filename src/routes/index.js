const express = require("express")
const routes = express.Router()

const productRoutes = require("./productRoutes/product.routes")

routes.use("/product", productRoutes)

module.exports = routes
