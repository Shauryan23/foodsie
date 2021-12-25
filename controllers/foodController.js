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
