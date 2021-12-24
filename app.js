const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const foodRouter = require('./routes/foodRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', foodRouter);

module.exports = app;
