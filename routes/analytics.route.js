const { Router } = require('express');

const analyticsController = require('../controllers/analytics.controller');
const passport = require('passport');


const analyticsRouter = Router();

analyticsRouter.get('/', passport.authenticate('jwt', { session: false }), analyticsController.analytics);
analyticsRouter.get('/overview', passport.authenticate('jwt', { session: false }), analyticsController.overview);

module.exports = analyticsRouter;