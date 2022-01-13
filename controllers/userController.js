const mongoose = require('mongoose');

const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const User = require('../models/User');
const Owner = require('../models/Owner');
const RestaurantVerification = require('../models/RestaurantVerification');
const signToken = require('../util/signToken');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please Provide Email and Password.', 404));
  }

  const user = await User.findOne({ email }).select('password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Invalid Credentials', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'Success',
    token,
  });
});

exports.signupUser = catchAsync(async (req, res, next) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  await user.save();

  const token = signToken(user._id);

  res.status(201).json({
    status: 'Success',
    token,
    data: {
      username: user.userName,
      email: user.email,
    },
  });
});

exports.signupOwner = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const userDetails = await User.findById(req.params.id).select(
      '+password -_id -metaData -__v',
    );

    const owner = new Owner({
      userName: userDetails.userName,
      email: userDetails.email,
      password: userDetails.password,
      passwordConfirm: userDetails.password,
      restDetails: {
        restId: mongoose.Types.ObjectId(),
        restName: req.body.restName,
      },
    });

    session.startTransaction();

    await User.findByIdAndDelete(req.params.id, { session: session });

    await owner.save({ session: session });

    await session.commitTransaction();
    session.endSession();

    const token = signToken(owner._id);

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        restName: owner.restDetails.restName,
        verification: owner.restDetails.verification,
      },
    });
  } catch (err) {
    session.abortTransaction();

    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Failed Storing the Data. Please Try Again Later',
      err,
    });
  }
};

// addRestaurant Feature to be added in next version
/*
exports.addRestaurant = catchAsync(async (req, res, next) => {
  const ownerDetails = await Owner.findById(req.params.id);

  ownerDetails.metaData.timeLog.lastUpdated = Date.now();

  ownerDetails.restDetails.unshift({
    restId: mongoose.Types.ObjectId(),
    restName: req.body.restName,
  });

  const owner = await ownerDetails.save();

  res.json({
    status: 'Success',
    owner,
  });
});
*/

// Add a more descriptive Error to notify if the user has resgistered as owner
exports.assignVerification = catchAsync(async (req, res, next) => {
  const query = await Owner.findById(req.params.id).select('restDetails');

  if (!query) {
    return next(
      new AppError(
        `Oops! Looks like you haven't registered your Restaurant yet!`,
        400,
      ),
    );
  }

  // Add Error Handler Logic To check if query object is empty and send the response
  const restDetails = {
    ownerDetails: req.params.id,
    restId: query.restDetails.restId,
    restName: query.restDetails.restName,
  };

  const restVerify = new RestaurantVerification({
    restDetails: restDetails,
    isReviwed: false,
    isVerified: false,
  });

  await restVerify.save();

  res.status(200).json({
    status: 'Success',
    message: 'Applied For Verification.',
  });
});
