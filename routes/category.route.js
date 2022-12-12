const { Router } = require('express');
const passport = require('passport');

const categoryController = require('../controllers/category.controller');

const categoryRouter = Router();

categoryRouter.get('/', passport.authenticate('jwt', { session: false }), categoryController.getAll);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.post('/', categoryController.create);
categoryRouter.patch('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.delete);

module.exports = categoryRouter;
