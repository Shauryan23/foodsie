const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./User');

const options = { discriminatorKey: 'kind' };

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

module.exports = OwnerSchema;
