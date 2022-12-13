const { Router } = require('express');

const orderController = require('../controllers/order.controller');
const passport = require('passport');

const orderRouter = Router();

orderRouter.get('/', passport.authenticate('jwt', { session: false }), orderController.getAll);
orderRouter.post('/', passport.authenticate('jwt', { session: false }), orderController.create);

module.exports = orderRouter;