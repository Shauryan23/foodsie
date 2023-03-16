const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
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
  {
    timestamps: true,
  }
)

const FoodItemSchema = new Schema({
  foodName: {
    type: String,
    required: [true, 'Name of the Dish is Required'],
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  madeBy: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Please Specify the Provider of the Dish'],
  },
  price: {
    //Validation for precision
    type: Number,
    required: [true, 'Price for a Dish is Required'],
  },
  category: {
    type: String,
    enum: ['Dish', 'Cuisine'],
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
  serviceProvided: {
    isAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    delivery: {
      type: String,
      enum: ['Available', 'Not Available'],
      required: true,
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
  reviews: [reviewSchema],
  metaData: {
    custService: {
      type: Number,
      required: [
        true,
        'Please Provide Customer Service Number of your Business',
      ],
    },
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
  },
});

FoodItemSchema.statics.findByCategory = function (category) {
  return this.find({ category }).select('-metaData');
};

FoodItemSchema.query.findBySubCategory = function (subCategory) {
  return this.where({ subCategory }).select('-metaData');
};

module.exports = mongoose.model('FoodItem', FoodItemSchema);
