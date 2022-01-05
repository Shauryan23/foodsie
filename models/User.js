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
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // metaData: {
    //   timeLog: {
    //     createdAt: {
    //       type: Date,
    //       default: Date.now(),
    //     },
    //     lastUpdated: {
    //       type: Date,
    //       default: null,
    //     },
    //   },
    // },
  },
  options,
);

module.exports = mongoose.model('User', UserSchema);
