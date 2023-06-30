const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const Order = require('../models/Order.js')

exports.addOrderItems = catchAsync(async (req, res, next) => {
  const {
    restaurantId,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
  } = req.body;

  if (orderItems.length === 0) {
    return next(
      new AppError(
        'No Order Items Present!',
        400,
      ),
    );
  }
  
  const order = new Order({
    userDetails: req.user._id,
    restaurantDetails: restaurantId,
    orderSummary: {
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
    }
  });

  const createdOrder = await order.save();

  res.status(201).json({
    status: 'Success',
    message: 'Order Created Successfully.',
    createdOrder,
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.params._id });
  
  if(!orders) {
    return next(
      new AppError(`No Orders Found with Request ID: ${req.params._id}`)
    );
  }

  res.status(200).json({
    status: 'Success',
    orders,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if(!order) {
    return next(
      new AppError(`No Orders Found with Request ID: ${req.params.id}`)
    );
  }

  res.status(200).json({
    status: 'Success',
    message: 'Order Request Successfull.',
    order,
  })
});

exports.getAllOrdersItems = catchAsync(async (req, res, next) => {
  const orders = await Order.find({}).populate('user', 'id name');

  if(!orders) {
    return next(
      new AppError(
        'No Orders Found!',
        400,
      ),
    );
  }

  res.status(200).json({
    status: 'Success',
    message: 'All Orders Request Successfull.',
    orders,
  })
});