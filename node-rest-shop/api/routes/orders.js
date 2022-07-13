const express = require("express");
const router = express.Router();
const CheckAuth = require('../Middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/',CheckAuth,OrdersController.orders_get_all);

router.get('/:OrderId',CheckAuth,OrdersController.orders_get_order);

router.post('/',CheckAuth,OrdersController.orders_create_order);

router.delete('/:OrderId',CheckAuth,OrdersController.orders_delete_order);

module.exports = router;