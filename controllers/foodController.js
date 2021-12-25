const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getFoodByCategory = async (req, res) => {
  try {
    const foodsInCategory = await Food.findByCategory(req.params.category);
    res.json(foodsInCategory);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getFoodBySubCategory = async (req, res) => {
  const foodsInSubCategory = await Food.findByCategory(
    req.params.category
  ).findBySubCategory(req.params.subcategory);
  res.json(foodsInSubCategory);
};

exports.postFood = async (req, res) => {
  try {
    const newFood = new Food({
      foodName: req.body.foodName,
      category: req.body.category,
      subCategory: req.body.subCategory,
    });

    const food = await newFood.save();

    res.status(201).json({
      status: 'success',
      food,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Failed Storing the Data.',
    });
  }
};
