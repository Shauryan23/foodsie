const mongoose = require('mongoose');

const User = require('./User');

const { Schema } = mongoose;

const options = { discriminatorKey: 'kind' }; //, _id: 0 -> Try this if another id is added

const OwnerSchema = User.discriminator(
  'AddOwnership',
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
      verfication: {
        type: String,
        enum: ['Verified', 'Pending', 'Rejected'],
        required: true,
      },
      restId: {
        type: Schema.Types.ObjectId,
        // type: mongoose.Types.ObjectId,
      },
      restDocs: {
        type: [String],
        required: true,
      },
    },
    options
  )
);

module.exports = mongoose.model('Owner', OwnerSchema);
