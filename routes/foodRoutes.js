const express = require('express');

const foodController = require('../controllers/foodController');

const router = express.Router();

// router.param('type', (req, res, next, val) => {
//   console.log(`Type Of Food Searched is: ${val}`);
//   next();
// });

router.post('/', foodController.postFood);

router.get('/', foodController.getAllFoods);

router.get('/:category/:subcategory', foodController.getFoodBySubCategory);

router.get('/:category', foodController.getFoodByCategory);

module.exports = router;
