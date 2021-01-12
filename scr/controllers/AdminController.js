
class AdminController {

    Index( req, res ) {
        res.render( 'admin/index', { system_msg: req.flash( 'system_msg' ) } )
    }

    Profile( req, res ) {
        res.render( 'admin/profile', { system_msg: req.flash( 'system_msg' ) } )
    }

    UpdateProfile( req, res ) {
        res.redirect( '/dashboard/loja', { system_msg: req.flash( 'system_msg' ) } )
    }

}

module.exports = new AdminController()