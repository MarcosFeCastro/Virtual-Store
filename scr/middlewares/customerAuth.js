function auth( req, res, next ) {
    if( req.session.user ) { next() } else { res.redirect("/entrar") }
}

module.exports = auth