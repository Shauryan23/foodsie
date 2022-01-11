const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('madeBy').select('-metaData');

    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Server Error: Failed to Retrieve Data from Server!',
      err,
    });
  }
};

// If there is an error might be because of the , on line 21 after req.params.category
exports.getFoodByCategory = async (req, res) => {
  try {
    if (req.params.subcategory) {
      const foodsInCategory = await Food.findByCategory(
        req.params.category,
      ).findBySubCategory(req.params.subcategory);

      if (foodsInCategory.length === 0) {
        return res.send('No Data Found!');
      }

      res.status(200).json(foodsInCategory);
    } else {
      const foodsInCategory = await Food.findByCategory(req.params.category);

      if (foodsInCategory.length === 0) {
        return res.status(404).send('No Data Found!');
      }

      res.status(200).json(foodsInCategory);
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getFoodbyId = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    res.json({
      status: 'Success',
      food,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Dish Not Found',
      err,
    });
  }
};

exports.postFood = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Failed Storing the Data.',
      err,
    });
  }
};

exports.editFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(food);
  } catch (err) {
    res.status(503).json({
      status: 'failed',
      message: 'Server Error: Data Updation Process Failed.',
      err,
    });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ msg: 'Food Data Not Found!' });
    }

    await Food.findOneAndDelete(food);

    res.json({
      status: 'Success',
      message: 'Food Data Removed Successfully.',
    });
  } catch (err) {
    res.json({
      status: 'Failed',
      message: 'Data Removal Process Failed',
      err,
    });
  }
};

exports.deleteAllFoods = async (req, res) => {
  try {
    await Food.deleteMany();

    res.status(204);
  } catch (err) {
    res.status(400).json('Data Deletion Process Failed');
  }
};
