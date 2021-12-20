const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  madeBy: {
    type: Schema.Types.ObjectId,
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
  isVeg: {
    type: String,
    required: true,
  },
  prepTime: {
    type: Number,
  },
  ratings: {
    type: Number,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('Food', FoodSchema);
