const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  madeBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  isAvailabe: {
    type: Boolean,
    default: true,
    require: true,
    // To-do: Modify the delivery attribute to be conditionally available.
    // delivery: {
    // type: String,
    // enum: ['Available', 'Not Available'],
    // require: true,
  },
  prepTime: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
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
    },
    select: false, //hides data
  },
});

module.exports = mongoose.model('Food', FoodSchema);
