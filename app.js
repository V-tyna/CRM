const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const analyticsRouter = require('./routes/analytics.route');
const authRouter = require('./routes/auth.route');
const categoryRouter = require('./routes/category.route');
const orderRouter = require('./routes/order.route');
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

module.exports = app;
