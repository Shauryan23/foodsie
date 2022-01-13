const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const AppError = require('./util/appError');
const errorHandler = require('./controllers/errorController');
const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/admin', adminRouter);

app.use('/users', userRouter);

app.use('/foods', foodRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not Found!`, 404));
});

app.use(errorHandler);

module.exports = app;
