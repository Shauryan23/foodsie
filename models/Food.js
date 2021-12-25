const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
});

FoodSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

// FoodSchema.query.byCategory = function (category) {
//   return this.find({ category });
// };

module.exports = mongoose.model('Food', FoodSchema);
