const express = require('express');

const foodController = require('../controllers/foodController');

const router = express.Router();

// router.param('type', (req, res, next, val) => {
//   console.log(`Type Of Food Searched is: ${val}`);
//   next();
// });

router.get('/', foodController.getAllFoods);

router.get('/:type', (req, res) => {
  res.send(`Special Type of food Searched`);
});

module.exports = router;
