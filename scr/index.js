const express = require("express")
const MercadoPago = require("mercadopago")
const bodyParser = require("body-parser")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")
const mongoose = require("mongoose")

const app = express()

app.use( express.static("public") )

app.set( 'view engine', 'ejs' )
app.set( 'views', path.join( __dirname, 'views' ) )

app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )

app.use( session( {
    secret: "qualquercoisa", cookie: { maxAge: 86400000 }, // 24hrs
    saveUninitialized: true, resave: true
} ) )
app.use( flash() )

// 'mongodb://usuario:senha@host/base' // 'mongodb://localhost:27017/store'
mongoose.connect( 'mongodb://localhost/store', { useNewUrlParser: true, useUnifiedTopology: true } ).then( () => {
        console.log( "MongoDB connected" )
    }, error => { console.error( "error", error ) }
);


MercadoPago.configure( {
    sandbox: true,
    access_token: ""
} )


const CustomerRouter = require("./routers/CustomerRouter")
const AdminRouter = require("./routers/AdminRouter")

app.use( "/", CustomerRouter )
app.use( "/", AdminRouter )

app.listen( 8080, ( req, res ) => {
    console.log( "Server on" );
} )