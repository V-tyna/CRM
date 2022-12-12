const { Router } = require('express');

const analyticsController = require('../controllers/analytics.controller');

const analyticsRouter = Router();

analyticsRouter.get('/', analyticsController.analytics);
analyticsRouter.get('/overview', analyticsController.overview);

module.exports = analyticsRouter;