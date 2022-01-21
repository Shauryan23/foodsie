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
