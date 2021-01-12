const express = require("express")
const router = express.Router()

const CustomerController = require("../controllers/CustomerController")
const ProductController = require("../controllers/ProductController")
const PaymentController = require("../controllers/PaymentController")
const OrderController = require("../controllers/OrderController")
const FaqController = require("../controllers/FaqController")

const Auth = require("../middlewares/customerAuth")

router.get( "/", CustomerController.Index ) // Destaques
router.get( "/produtos", ProductController.ListAll ) // PRODUTOS
router.get( "/produto/:id", ProductController.FindOne )

router.get( "/entrar", CustomerController.Login )
router.post( "/authenticate", CustomerController.Authenticate )
router.get( "/logout", CustomerController.Logout )
router.get( "/cadastro", CustomerController.Register )
router.post( "/customer/register", CustomerController.Create )

router.get( "/perfil", Auth, CustomerController.Profile )
router.put( "/profile/update", Auth, CustomerController.Update )

router.get( "/pedido/:id", Auth, OrderController.GetOrder )

router.get( "/faq", FaqController.ListAll )

router.get( "/carrinho", CustomerController.Cart )
router.post( "/list-itens", CustomerController.ListCart )

router.get( "/comprar", Auth, OrderController.GenerateOrder )
router.post( "/payment", Auth, OrderController.Create )
router.get( "/notification", PaymentController.Notification )

module.exports = router