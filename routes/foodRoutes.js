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

router.post('/', foodController.postFood);

router.patch('/:id', foodController.editFood);

router.delete('/:id', foodController.deleteFood);

router.delete('/foods/deleteAll', foodController.deleteAllFoods);

module.exports = router;
