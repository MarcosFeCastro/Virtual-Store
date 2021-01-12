const mongoose = require("mongoose");

const product = new mongoose.Schema( {
    name: String,
    slug: String,
    description: String,
    maker: String,
    price: Number,
    quantity: Number, // Estoque
    visible: Boolean,
    category: [],
    created_at: Date,
    updated_at: Date
} )

module.exports = product