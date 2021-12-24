const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
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
    restMobile: {
      type: [Number],
      required: true,
      unique: true,
    },
    required: true,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

/* 
{
    "_id": {
        "$oid": "61c56161d5cfffc9e7413999"
    },
    "ownedBy": {
        "$oid": "61c56161d5cfffc9e74owner"
    },
    "contacts": {
      "restEmail": "test@test.com",
      "restNumber": [9898989898]
    }
}
*/
