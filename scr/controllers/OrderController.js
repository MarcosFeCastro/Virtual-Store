const session = require("express-session")
const CustomerService = require("../services/CustomerService")
const OrderService = require("../services/OrderService")
const ProductService = require("../services/ProductService")
//const PaymentController = require("./PaymentController")

class OrderController {

    FindById( req, res ) {
        OrderService.FindById( req.params.id ).then( order => {
            res.render( 'admin/order/order', { order: order } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível carregar dados da compra' )
            res.redirect( '/dashboard', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    FindAll( req, res ) {
        OrderService.FindAll().then( orders => {
            res.render( 'admin/order/orders', { orders: orders } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível carregar as compras' )
            res.redirect( '/dashboard', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    FindByCustomer( req, res ) {
        let id = req.body.id
        OrderService.FindByCustomer( id ).then( orders => {
            res.render( 'admin/order/orders', { orders: orders } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível carregar as compras' )
            res.redirect( '/dashboard', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    // Customer

    GetOrder( req, res ) {
        OrderService.FindById( req.params.id ).then( order => {
            res.render( 'customer/order/order', { order: order } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/perfil', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    GenerateOrder( req, res ) {
        let id = req.session.user.id
        CustomerService.FindById( id ).then( user => {
            
            res.render( 'customer/order/new', { user: user } )

        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/carrinho', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    async Create( req, res ) {
        try {
            let user = await CustomerService.FindById( req.session.user.id )
            let cart = JSON.parse( JSON.stringify( user.cart ) )
            let ids = []
            await cart.forEach( item => { ids.push( item.id ) } )
            let productList = await ProductService.ListCart( ids )
            var items = []
            var amount = 0
            await productList.forEach( product => {
                let i = cart.findIndex( item => product._id == item.id )
                items.push( { id: product._id, name: product.name, price: product.price, quantity: cart[i].qtd } )
                amount += ( product.price * cart[i].qtd )
            } )
            let data = { status: null, payment_status: null, amount: parseFloat( amount ).toFixed( 2 ), products: items,
                customer: { id: user._id, cpf: user.cpf, name: user.first_name + ' ' + user.last_name, email: user.email, phone: user.phone || null, message: req.body.message || null },
                address: { street: req.body.street || user.street, city: req.body.city || user.city, state: req.body.state || user.state, zip_code: req.body.zip_code || user.zip_code, address_2: req.body.address_2 || user.address_2 || null },
                created_at: new Date()
            }
            let order = await OrderService.Create( data )

            res.render( 'customer/order/order', { order: order } )

        } catch( error ) { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/carrinho', { system_msg: req.flash( 'system_msg' ) } )
        }
    }

    async CreateTest1( req, res ) {

        let userId = req.session.user.id

        let body = JSON.stringify( req.body )
        //let body = JSON.parse( req.body )
        console.log( body )
        
        let cart = body.products

        let ids = []
        await cart.forEach( item => { ids.push( item.id ) } )
        
        var items = []
        var amount = 0

        try {
            let productList = await ProductService.ListCart( ids )
            let user = await CustomerService.FindById( userId )

            await productList.forEach( product => {
                let i = cart.findIndex( item => product._id == item.id )
                items.push( {
                    id: product._id, name: product.name, price: product.price, quantity: cart[i].qtd
                } )
                amount += ( product.price * cart[i].qtd )
            } )

            console.log( items )

            let data = { 
                status: null, payment_status: null, amount: parseFloat( amount ).toFixed( 2 ), products: items,
                customer: {
                    id: user._id, cpf: user.cpf, name: user.first_name + ' ' + user.last_name, email: user.email, phone: user.phone || null, message: req.body.message || null
                },
                address: {
                    street: req.body.street || user.street, city: req.body.city || user.city, state: req.body.state || user.state,
                    zip_code: req.body.zip_code || user.zip_code, address_2: req.body.address_2 || user.address_2 || null
                },
                created_at: new Date()
            }
            //console.log( data )

            let order = await OrderService.Create( data )
            
            console.log( order )
            //PaymentController.Payment( order )

            //res.redirect( '/perfil' ) // remover
            //res.redirect( '/pedido', order._id ) // remover
            res.render( 'customer/order/order', { order: order } ) // remover

        } catch( error ) { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/carrinho', { system_msg: req.flash( 'system_msg' ) } )
        }
    }

    Update( req, res ) {
        
    }

}

module.exports = new OrderController()