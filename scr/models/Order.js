const mongoose = require("mongoose")

const order = mongoose.Schema( {

    status: String,
    payment_status: String,
    amount: Number,

    products: [
        product = {
            id: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ],

    customer: {
        id: String,
        cpf: String,
        name: String,
        email: String,
        phone: String,
        message: String
    },

    address: {
        street: String,
        city: String,
        state: String,
        zip_code: String,
        address_2: String
    },

    created_at: Date,
    updated_at: Date
    
} )

module.exports = order