const mongoose = require('mongoose');

const { Schema } = mongoose;

const options = { discriminatorKey: 'kind' };

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    restOwned: [Schema.Types.ObjectId],
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
  },
  options
);

module.exports = mongoose.model('User', UserSchema);
