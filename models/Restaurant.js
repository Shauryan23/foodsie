const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  _id: false,
  restId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  restName: {
    type: String,
    required: true,
  },
  ownerDetails: {
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
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
