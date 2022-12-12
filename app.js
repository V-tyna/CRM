const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const analyticsRouter = require('./routes/analytics.route');
const authRouter = require('./routes/auth.route');
const categoryRouter = require('./routes/category.route');
const { MONGO_URI } = require('./configs/index');
const orderRouter = require('./routes/order.route');
const passportMiddleware = require('./middlewares/passport');
const positionRouter = require('./routes/position.route');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);

mongoose.set('strictQuery', false);

async function start() {
	try {
		await mongoose.connect(MONGO_URI, { useNewUrlParser: true })
      .then(() => console.log('MongoDB connected.'));
	} catch (error) {
		console.log('Server connection error: ', error);
	}
}

start();

app.use(passport.initialize());
passportMiddleware(passport);

module.exports = app;
