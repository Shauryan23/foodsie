const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    default: null,
  },
  address: {
    type: [String],
    default: null,
  },
  restOwned: {
    type: [Schema.Types.ObjectId],
    ref: 'Restaurant',
  },
  orders: {
    type: [Schema.Types.ObjectId],
    default: null,
  },
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

module.exports = mongoose.model('Profile', ProfileSchema);
