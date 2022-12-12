const { Router } = require('express');

const categoryController = require('../controllers/category.controller');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.post('/', categoryController.create);
categoryRouter.patch('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.delete);

module.exports = categoryRouter;
