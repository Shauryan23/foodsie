const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const Food = require('../models/Food');

exports.getAllFoods = catchAsync(async (req, res, next) => {
  const foods = await Food.find().populate('madeBy').select('-metaData');

  if (!foods) {
    return next(new AppError('Oops! No Data Found for your Query', 404));
  }

  res.status(200).json({
    status: 'Success',
    foods,
  });
});

// If there is an error might be because of the , on line 21 after req.params.category
exports.getFoodByCategory = catchAsync(async (req, res, next) => {
  if (req.params.subcategory) {
    const foodsInCategory = await Food.findByCategory(
      req.params.category,
    ).findBySubCategory(req.params.subcategory);

    if (foodsInCategory.length === 0) {
      return res.send('Oops! No Data Found for your Query', 404);
    }

    res.status(200).json({
      status: 'Success',
      foodsInCategory,
    });
  } else {
    const foodsInCategory = await Food.findByCategory(req.params.category);

    if (foodsInCategory.length === 0) {
      return res.send('Oops! No Data Found for your Query', 404);
    }

    res.status(200).json({
      status: 'Success',
      foodsInCategory,
    });
  }
});

exports.getFoodbyId = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return next(new AppError('Oops! No Data Found for your Query', 404));
  }

  res.json({
    status: 'Success',
    food,
  });
});

exports.postFood = catchAsync(async (req, res, next) => {
  const newFood = new Food({
    foodName: req.body.foodName,
    category: req.body.category,
    subCategory: req.body.subCategory,
    madeBy: req.body.madeBy,
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

  res.status(200).json(food);
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
