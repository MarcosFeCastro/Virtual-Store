const ProjectService = require("../services/ProductService")

class ProductController {

    FindById( req, res ) {
        ProjectService.FindById( req.params.id ).then( product => {
            console.log( product );
            res.render( 'admin/product/product', { product: product } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível carregar os produtos' )
            res.redirect( '/admin', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    FindByCategory( req, res ) {
        
    }

    FindAll( req, res ) {
        ProjectService.FindAll().then( products => {
            res.render( 'admin/product/products', { products: products } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível carregar os produtos' )
            res.redirect( '/admin', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    New( req, res ) {
        res.render( "admin/product/form" )
    }

    Create( req, res ) {

        let product = {
            name: req.body.name || "test",
            //slug: slugify( req.body.name ),
            description: req.body.description || "test",
            maker: req.body.maker || "test",
            price: parseFloat( req.body.price ) || parseFloat( 9.90 ).toFixed( 2 ),
            quantity: req.body.quantity || 1,
            visible: req.body.visible || true
        }

        ProjectService.Create( product ).then( response => {
            res.redirect( '/admin/produtos' )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível cadastrar o produto' )
            res.redirect( '/admin/produto', { system_msg: req.flash( 'system_msg' ) } )
        } )

    }

    Update( req, res ) {
        
    }

    Delete( req, res ) {
        
    }

    // Customer

    FindOne( req, res ) {
        ProjectService.FindOne( req.params.id ).then( product => {
            res.render( 'product', { product: product } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    ListAll( req, res ) {
        ProjectService.ListAll().then( products => {
            res.render( 'products', { products: products } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    ListBySlug( req, res ) {
        let product = {}
        res.render( 'product', { product: product } )
    }

}

module.exports = new ProductController()