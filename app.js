const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/user-route', userRouter);

app.use('/', foodRouter);

module.exports = app;
