const mongoose = require("mongoose")
const order = require("../models/Order")

const Order = mongoose.model( "Order", order )

class OrderService {

    FindById( id ) {
        return Order.findOne( { _id: id } )
    }

    FindAll() {
        return Order.find()
    }

    FindByCustomer( id ) {
        return Order.find( { "customer.id": id } )
    }

    Create( order ) {
        return Order.create( order )
    }

    UpdateStatus( id, status ) {
        return Order.findByIdAndUpdate( id, { $set: { status: status } }, { new: true } )
    }

    UpdatePaymentStatus( id, status ) {
        return Order.findByIdAndUpdate( id, { $set: { payment_status: status } }, { new: false } )
    }

}

module.exports = new OrderService()