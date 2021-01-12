function auth( req, res, next ) {
    //if( req.session.user && req.session.user.role == 'admin' ) { next() } else { res.redirect( '/' ) }
    next()
}

module.exports = auth