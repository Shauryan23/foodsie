const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  restDetails: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodsAvailable: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
