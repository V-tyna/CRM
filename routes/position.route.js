const { Router } = require('express');

const positionController = require('../controllers/position.controller');

const positionRouter = Router();

positionRouter.get('/:category', positionController.getByCategoryId);
positionRouter.post('/', positionController.create);
positionRouter.patch('/:id', positionController.update);
positionRouter.delete('/:id', positionController.delete);

module.exports = positionRouter;