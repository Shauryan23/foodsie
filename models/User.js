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
    restOwned: {
      type: [Schema.Types.ObjectId],
    },
  },
  options
);

module.exports = mongoose.model('User', UserSchema);
