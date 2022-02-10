const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  userDetails: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  restaurantDetails: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  orderSummary: {
    transactionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    orderPlacedAt: {
      type: Date,
      default: Date.now(),
    },
    paymentType: {
      type: String,
      enum: ['Net Banking', 'Debit Card', 'Credit Card', 'Cash On Delivery'],
      required: true,
    },
  },
});

module.exports = mongoose.model('Order', OrderSchema);
