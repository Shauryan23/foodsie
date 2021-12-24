const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodSchema = new Schema({
  foodName: {
    type: String,
    required: [true, 'Name of the Dish is Required'],
    trim: true,
  },
  madeBy: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Please Specify the Provider of the Dish'],
  },
  price: {
    type: Number,
    required: [true, 'Price for a Dish is Required'],
  },
  category: {
    type: String,
    required: [true, 'Please Provide the Appropriate Category'],
    trim: true,
  },
  subCategory: {
    type: String,
    required: [true, 'Please Provide the Appropriate Sub-Category'],
    trim: true,
  },
  isVeg: {
    type: Boolean,
    required: [true, 'Please Specify if the Dish is Veg or Non-Veg'],
  },
  isAvailabe: {
    type: Boolean,
    default: true,
    require: true,
    delivery: {
      type: String,
      enum: ['Available', 'Not Available'],
      require: true,
    },
  },
  prepTime: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, 'Please Provide a Short Description of the Dish'],
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
        ref: 'User',
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
      custService: {
        type: Number,
        required: [
          true,
          'Please Provide Customer Service Number of your Business',
        ],
      },
    },
    select: false, //hides data
  },
});

FoodSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

// FoodSchema.query.byCategory = function (category) {
//   return this.find({ category });
// };

module.exports = mongoose.model('Food', FoodSchema);
