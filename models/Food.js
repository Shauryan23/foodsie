const mongoose = require('mongoose');

const { Schema } = mongoose;

// const FoodSchema = new Schema({
//   foodName: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   subCategory: {
//     type: String,
//     required: true,
//   },
// });

const FoodSchema = new Schema({
  foodName: {
    type: String,
    required: [true, 'Name of the Dish is Required'],
    trim: true,
  },
  // madeBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Restaurant',
  //   required: [true, 'Please Specify the Provider of the Dish'],
  // },
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

FoodSchema.statics.findByCategory = function (category) {
  return this.find({ category }).select('-metaData');
};

FoodSchema.query.findBySubCategory = function (subCategory) {
  return this.where({ subCategory }).select('-metaData');
};

module.exports = mongoose.model('Food', FoodSchema);

// {
//     "foodName": "Cheese Chilli Momos",
//     "category": "Dish",
//     "subCategory": "Fast-Food",
//     "price": 80,
//     "isVeg": "true",
//     "serviceProvided": {
//       "isAvailable": "true",
//       "delivery": "Available"
//     },
//     "prepTime": 20,
//     "description": "Soft Momos Filled With Cheese",
//     "ratingsAverage": 4,
//     "ratingsQuantity": 20,
// }
