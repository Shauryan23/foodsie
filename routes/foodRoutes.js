const express = require('express');

const foodController = require('../controllers/foodController');

const router = express.Router();

// router.param('type', (req, res, next, val) => {
//   console.log(`Type Of Food Searched is: ${val}`);
//   next();
// });

router.get('/foods/:id', foodController.getFoodbyId);

router.get('/:category/:subcategory?', foodController.getFoodByCategory);

router.get('/', foodController.getAllFoods);

module.exports = router;
