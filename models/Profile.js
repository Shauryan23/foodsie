const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // immutable: (doc) => doc.kind !== 'Owner',
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: [
    {
      type: String,
      required: true,
    },
  ],
  liked: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  Orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

module.exports = mongoose.model('Profile', ProfileSchema);
