const express = require('express');

const foodController = require('../controllers/foodController');

const router = express.Router();

// router.param('type', (req, res, next, val) => {
//   console.log(`Type Of Food Searched is: ${val}`);
//   next();
// });

// Check if route below and next one after that work properly
// Else : use query parameter for category as well
router.get('/foods/:id', foodController.getFoodbyId);

router.get('/:category/:subcategory?', foodController.getFoodByCategory);

router.get('/', foodController.getAllFoods);

module.exports = router;
