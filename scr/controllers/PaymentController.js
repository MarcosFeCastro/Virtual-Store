const MercadoPago = require("mercadopago")
const OrderService = require("../services/OrderService")

class PaymentController {

    async Payment( order ) {

        let title = ''
        order.products.forEach( product => {
            title += product.quantity + 'x' + ' ' + product.name + '; '
        } )

        let paymentData = {
            items: [
                item = {
                    id: order._id,
                    title: title,
                    quantity: 1,
                    currenty_id: 'BRL',
                    unit_price: parseFloat( order.amount )
                }
            ],
            payer: {
                email: order.customer.email
            },
            external_reference: order._id
        }

        try {
            let payment = await MercadoPago.preferences.create( paymentData )
            
            console.log( payment )
            // Salvar pagamento no bd

            res.redirect( payment.body.init_point )
            
        } catch( error ) { console.error( error )
            req.flash( 'system_msg', 'Ops, algo deu errado!' )
            res.redirect( '/carrinho', { system_msg: req.flash( 'system_msg' ) } )
        }

    }

    async Notification( req, res ) {
        
        console.log( req.query )

        let filter = {
            "order.id": req.query.id
        }

        setTimeout( () => {

            MercadoPago.payment.search( {
                qs: filter
            } ).then( data => {
                
                console.log( data )

                if( data.body.results[0] != undefined ) {
                    
                    console.log( data.body.results[0].external_reference )
                    console.log( data.body.results[0].status )

                    if ( data.body.results[0].status === 'approved' ) {
                        let order = OrderService.UpdatePaymentStatus( data.body.results[0].external_reference, 'approved' )

                        if ( order != undefined ) {
                            res.status( 200 )
                        } else {
                            res.status( 404 )
                        }
                        
                    } else {
                        res.status( 404 )
                    }

                } else {
                    res.status( 404 )
                }

            } ).catch( error => { console.error( error )
                res.status( 500 )
            } )

        }, 20000 )

    }

}

module.exports = new PaymentController()