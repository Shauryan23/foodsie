const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
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
  foods: [
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
