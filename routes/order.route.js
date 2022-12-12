const { Router } = require('express');

const orderController = require('../controllers/order.controller');

const orderRouter = Router();

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', orderController.create);

module.exports = orderRouter;