const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  ownedBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  FoodType: {
    type: [String],
    enum: ['Veg', 'Non-Veg'],
  },
  ratings: {
    type: Number,
  },
  contacts: {
    restEmail: {
      type: String,
      required: true,
    },
    restMobile: [Number],
    required: true,
    unique: true,
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
  metaData: {
    timeLog: {
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      lastUpdated: {
        type: Date,
        default: null,
      },
      custService: {
        type: Number,
        required: true,
      },
    },
    select: false, //hides data
  },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
