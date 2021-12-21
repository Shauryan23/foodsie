const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  FoodType: { type: [String], enum: ['Veg', 'Non-Veg'] },
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

module.exports = mongoose.model('Restaurant', RestaurantSchema);
