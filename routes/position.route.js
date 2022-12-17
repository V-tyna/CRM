const { Router } = require('express');

const passport = require('passport');
const positionController = require('../controllers/position.controller');

const positionRouter = Router();

positionRouter.get('/:categoryId', passport.authenticate('jwt', { session: false }), positionController.getByCategoryId);
positionRouter.post('/', passport.authenticate('jwt', { session: false }), positionController.create);
positionRouter.patch('/:id', passport.authenticate('jwt', { session: false }), positionController.update);
positionRouter.delete('/:id', passport.authenticate('jwt', { session: false }), positionController.delete);

module.exports = positionRouter;