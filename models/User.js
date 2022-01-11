const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
      validate: [validator.isEmail, 'Please Provide a Valid Email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords does not match!',
      },
    },
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
    },
  },
  options,
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.passwordConfirm = undefined;

  if (this.kind === 'Owner') return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.methods.checkPassword = async function (
  inputPassword,
  hashPassword,
) {
  return await bcrypt.compare(inputPassword, hashPassword);
};

module.exports = mongoose.model('User', UserSchema);
