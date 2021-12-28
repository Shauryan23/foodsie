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
      // type: [Schema.Types.ObjectId],
      type: Number,
    },
  },
  options,
);

const User = mongoose.model('User', UserSchema);

const OwnerSchema = User.discriminator(
  'Owner',
  new Schema(
    {
      isOwner: {
        type: Boolean,
        required: true,
      },
      restName: {
        type: String,
        required: true,
      },
    },
    options,
  ),
);

module.exports = {
  User: mongoose.model('User', UserSchema),
  Owner: OwnerSchema,
};
