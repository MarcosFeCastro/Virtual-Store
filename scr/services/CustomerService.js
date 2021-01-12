const mongoose = require("mongoose")
const customer = require("../models/Customer")

const Customer = mongoose.model( "Customer", customer )

class CustomerService {

    FindById( id ) {
        return Customer.findOne( { _id: id } )
    }

    FindByEmail( email ) {
        return Customer.findOne( { email } )
    }

    FindAll() {
        return Customer.find()
    }

    Create( customer ) {
        return Customer.create( customer )
    }

    Update( order ) {
        
    }

    UpdateCart( id, cart ) {
        return Customer.updateOne( { _id: id }, { $set: { cart: cart } }, { new: false } )
    }

}

module.exports = new CustomerService()