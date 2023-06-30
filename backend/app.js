const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./util/appError');
const errorHandler = require('./controllers/errorController');
const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const profileRouter = require('./routes/profileRoutes');
const orderRouter = require('./routes/orderRoutes')

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use('/api/admin', adminRouter);

app.use('/api/users', userRouter);

app.use('/api/profile', profileRouter);

app.use('/api/foods', foodRouter);

app.use('/api/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not Found!`, 404));
});

app.use(errorHandler);

module.exports = app;
