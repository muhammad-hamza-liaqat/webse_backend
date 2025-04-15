const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productTitle: {
            type: String
        },
        productDescription: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
        productImage: {
            type: String,
        },
        productPrice: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;