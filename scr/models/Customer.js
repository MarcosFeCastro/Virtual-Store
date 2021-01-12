const mongoose = require("mongoose")

const customer = mongoose.Schema( {

    cpf: String,
    first_name: String,
    last_name: String,
    sex: String,
    birthday: Date,
    phone: String,

    email: String,
    password: String,

    address: {
        street: String,
        city: String,
        state: String,
        zip_code: String,
        address_2: String
    },

    cart: {
        id: String,
        qtd: Number
    },

    email_ad: Boolean,

    created_at: Date,
    updated_at: Date

} )

module.exports = customer