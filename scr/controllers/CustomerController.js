const bcrypt = require("bcryptjs")

const CustomerService = require("../services/CustomerService")
const ProductService = require("../services/ProductService")
const OrderService = require("../services/OrderService")

class CustomerController {

    Index( req, res ) {
        res.render( 'index' )
    }

    async Profile( req, res ) {
        try {
            let user = await CustomerService.FindById( req.session.user.id )
            let orders = await OrderService.FindByCustomer( req.session.user.id.toString() )
            res.render( 'customer/profile/my', { user, orders } )
        } catch( error ) { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/entrar', { system_msg: req.flash( 'system_msg' ) } )
        }
    }

    Login( req, res ) {
        if ( req.session.user ) {
            res.redirect( '/perfil' )
        } else {
            res.render( 'customer/login' )
        }
    }

    Logout( req, res ) {
        req.session.user = undefined
        res.redirect( '/entrar' )
    }

    Authenticate( req, res ) {
        let email = req.body.email
        let password = req.body.password
        CustomerService.FindByEmail( email ).then( user => {
            if( user != undefined ) {
                if( bcrypt.compareSync( password, user.password ) ) {
                    req.session.user = {
                        id: user.id
                    }
                    res.redirect( '/perfil' )
                } else {
                    res.redirect( '/entrar' )
                }
            } else {
                res.redirect( '/entrar' )
            }
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/entrar', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    Register( req, res ) {
        res.render( 'customer/register' )
    }

    async Create( req, res ) {
        
        let data = { email: req.body.email, password: req.body.password, cpf: req.body.cpf, first_name: req.body.first_name,
            last_name: req.body.last_name, birthday: req.body.birthday, phone: req.body.phone, email_ad: req.body.email_ad, created_at: new Date()
        }

        try {
            
            let user = await CustomerService.FindByEmail( data.email )

            if( !user ) {

                let salt = bcrypt.genSaltSync( 10 )
                let hash = bcrypt.hashSync( data.password, salt )
                data.password = await hash

                let createdUser = await CustomerService.Create( data )

                if( !createdUser ) {
                    req.session.user = {
                        id: user.id
                    }
                    res.redirect( '/perfil' )
                } else {
                    res.redirect( '/entrar' )
                }

            } else {
                req.flash( 'email_msg', 'Email inválido!' )
                res.render( 'customer/register', { email_msg: req.flash( 'email_msg' ) } )
            }

        } catch( error ) { console.log( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.render( 'customer/register', { system_msg: req.flash( 'system_msg' ) } )
        }

    }

    Update( req, res ) {
        
    }

    Cart( req, res ) {
        res.render( 'cart' )
    }

    ListCart( req, res ) {
        let cart = req.body
        let ids = []
        cart.forEach( item => { ids.push( item.id ) } )
        ProductService.ListCart( ids ).then( async products => {
            if( req.session.user ) {
                await CustomerService.UpdateCart( req.session.user.id, cart )
            }
            res.json( products )
        } ).catch( error => { console.error( error )
            res.json( null )
        } )
    }

    // Admin

    FindById( req, res ) {
        CustomerService.FindById( req.params.id ).then( customer => {
            res.render( 'admin/customer/customer', { customer: customer } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível carregar dados do cliente' )
            res.redirect( '/dashboard', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

    FindAll( req, res ) {
        CustomerService.FindAll().then( customers => {
            res.render( 'admin/customer/customers', { customers: customers } )
        } ).catch( error => { console.log( error )
            req.flash( 'system_msg', 'Não foi possível carregar dados dos clientes' )
            res.redirect( '/dashboard', { system_msg: req.flash( 'system_msg' ) } )
        } )
    }

}

module.exports = new CustomerController()