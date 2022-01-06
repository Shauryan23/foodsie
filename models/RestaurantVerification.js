const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantVerificationSchema = new Schema({
  isReviewed: {
    type: Boolean,
    default: false,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  restDetails: {
    ownerDetails: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    restId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    restName: {
      type: String,
      required: true,
    },
    // restDocs: {
    //   type: [String],
    //   required: true,
    // },
  },
  issues: {
    issuesRaised: {
      type: Number,
      required: true,
      default: 0,
    },
    issueStatement: [
      {
        type: String,
        required: true,
      },
    ],
  },
  timeLog: {
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    lastReviewedAt: {
      type: Date,
      default: null,
    },
  },
});

module.exports = mongoose.model(
  'RestaurantVerification',
  RestaurantVerificationSchema,
);
