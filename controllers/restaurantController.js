const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const Food = require('../models/Food');

exports.postFood = catchAsync(async (req, res, next) => {
  const madeBy = req.user.restDetails.restId;

  if (!madeBy) {
    return new AppError(
      'No Restaurant Found! You must have a registered restaurant to add dishes.',
      404,
    );
  }

  const newFood = new Food({
    foodName: req.body.foodName,
    category: req.body.category,
    subCategory: req.body.subCategory,
    madeBy: madeBy,
    price: req.body.price,
    isVeg: req.body.isVeg,
    isAvailable: req.body.isAvailable,
    prepTime: req.body.prepTime,
    description: req.body.description,
    ratingsAverage: req.body.ratingsAverage,
    ratingsQuantity: req.body.ratingsQuantity,
    priceDiscount: req.body.priceDiscount,
    reviews: req.body.reviews,
    custService: req.body.custService,
    metaData: req.body.metaData,
  });

  const food = await newFood.save();

  res.status(201).json({
    status: 'Success',
    food,
  });
});

exports.editFood = catchAsync(async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'Success',
    food,
  });
});

exports.deleteFood = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return next(
      new AppError(
        `No Food Data Corresponding to ${req.params.id} ID found!`,
        404,
      ),
    );
  }

  await food.remove();

  res.status(204).json({
    status: 'Success',
    message: 'Food Data Removed Successfully.',
  });
});

exports.deleteAllFoods = catchAsync(async (req, res, next) => {
  await Food.deleteMany();

  res.status(204).json({
    status: 'Success',
    message: 'Food Data Removed Successfully.',
  });
});
