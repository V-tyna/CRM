const { Router } = require('express');
const passport = require('passport');

const categoryController = require('../controllers/category.controller');
const fileUploader = require('../middlewares/fileUploader');

const categoryRouter = Router();

categoryRouter.get('/', passport.authenticate('jwt', { session: false }), categoryController.getAll);
categoryRouter.get('/:id',passport.authenticate('jwt', { session: false }), categoryController.getById);
categoryRouter.post('/', passport.authenticate('jwt', { session: false }), fileUploader.single('image'), categoryController.create);
categoryRouter.patch('/:id', passport.authenticate('jwt', { session: false }), fileUploader.single('image'), categoryController.update);
categoryRouter.delete('/:id', passport.authenticate('jwt', { session: false }), categoryController.delete);

module.exports = categoryRouter;
