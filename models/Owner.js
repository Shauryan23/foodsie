const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./User');

const options = { discriminatorKey: 'kind' };

const OwnerSchema = new Schema(
  {
    isOwner: {
      type: Boolean,
      required: true,
    },
    restOwned: {
      type: Number,
      required: true,
    },
    // restOwned: [
    //   {
    //     restId: {
    //       type: Schema.Types.ObjectId,
    //       required: true,
    //     },
    //     restName: {
    //       type: String,
    //       required: true,
    //     },
    //     verfication: {
    //       type: String,
    //       enum: ['Verified', 'Pending', 'Rejected'],
    //       default: 'Pending',
    //       required: true,
    //     },
    //     restDocs: {
    //       type: [String],
    //       required: true,
    //     },
    //   },
    // ],
  },
  options,
);

module.exports = User.discriminator('Owner', OwnerSchema);
