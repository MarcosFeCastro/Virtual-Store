const express = require("express")
const router = express.Router()

const AdminController = require("../controllers/AdminController")
const ProductController = require("../controllers/ProductController")
const CustomerController = require("../controllers/CustomerController")
const OrderController = require("../controllers/OrderController")
const FaqController = require("../controllers/FaqController")

const Auth = require("../middlewares/adminAuth")

router.get( "/admin/home", Auth, AdminController.Index )

router.get( "/admin/loja", Auth, AdminController.Profile )
router.get( "/admin/loja/editar", Auth, AdminController.Profile )
router.post( "/admin/loja/editar", Auth, AdminController.UpdateProfile )

router.get( "/admin/produtos", Auth, ProductController.FindAll )
router.get( "/admin/produto/cadastro", Auth, ProductController.New )
router.post( "/admin/produto/cadastro", Auth, ProductController.Create )
router.get( "/admin/produto/:id", Auth, ProductController.FindById )
router.put( "/admin/produto/:id", Auth, ProductController.Update )
router.delete( "/admin/produto/:id", Auth, ProductController.Delete )

router.get( "/admin/clientes", Auth, CustomerController.FindAll )
router.get( "/admin/cliente/:id", Auth, CustomerController.FindById )

router.get( "/admin/pedidos", Auth, OrderController.FindAll )
router.get( "/admin/pedido/:id", Auth, OrderController.FindById )

router.get( "/admin/faqs", Auth, FaqController.FindAll )
router.post( "/admin/faq", Auth, FaqController.Create )
router.put( "/admin/faq", Auth, FaqController.Update )
router.delete( "/admin/faq", Auth, FaqController.Delete )

module.exports = router