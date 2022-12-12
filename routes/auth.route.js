const { Router } = require('express');

const { loginController, signupController } = require('../controllers/auth.controller');

const authRouter = Router();

authRouter.post('/login', loginController);

authRouter.post('/signup', signupController);

module.exports = authRouter;
