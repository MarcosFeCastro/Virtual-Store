const mongoose = require("mongoose")
const product = require("../models/Product")

const Product = mongoose.model( "Product", product )

class ProductService {

    FindById( id ) {
        return Product.findOne( { _id: id } )
    }

    FindBySlug( slug ) {
        return Product.find( { slug: slug } )
    }

    FindAll() {
        return Product.find()
    }

    FindOne( id ) {
        return Product.findOne( { _id: id } )
    }

    ListAll() {
        return Product.find( { visible: true } )
    }

    ListCart( ids ) {
        return Product.find( { 
            _id: {
                $in: ids
            }
        } )
    }

    Create( product ) {
        return Product.create( product )
    }

    Update( req, res ) {
        
    }

    Delete( req, res ) {
        
    }

}

module.exports = new ProductService()