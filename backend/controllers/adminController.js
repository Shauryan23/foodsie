const mongoose = require('mongoose');

const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const RestaurantVerification = require('../models/RestaurantVerification');
const Restaurant = require('../models/Restaurant');
const Owner = require('../models/Owner');

exports.getAllVerificationRequests = catchAsync(async (req, res, next) => {
  const verificationRequests = await RestaurantVerification.find();

  if (!this.getAllVerificationRequests) {
    return next(new AppError('No Verification Requests found!', 404));
  }

  res.status(200).json({
    status: 'Success',
    message:
      'All Restaurant Verification Requests Data Retrieved Successfully!',
    verificationRequests,
  });
});

exports.getRestVerificationRequest = catchAsync(async (req, res, next) => {
  const restRequest = await RestaurantVerification.findOne({
    'restDetails.restId': req.params.restId,
  });

  if (!restRequest) {
    return next(
      new AppError(
        `No Verification Request with Restaurant ID: ${req.params.restId} found!`,
        404,
      ),
    );
  }

  res.status(200).json({
    status: 'Success',
    message: 'Restaurant Verification Request Retrieved Successfully!',
    restRequest,
  });
});

exports.reviewRestVerificationRequest = catchAsync(async (req, res, next) => {
  const verificationDetails = await RestaurantVerification.findOne({
    'restDetails.restId': req.params.restId,
  });

  if (!verificationDetails) {
    return next(
      new AppError(
        `Verification Request With Restaurant ID: ${req.params.restId} Not Found!.`,
        404,
      ),
    );
  }

  verificationDetails.timeLog.lastReviewedAt = Date.now();

  if (req.body.issue) {
    verificationDetails.issues.issueStatement.unshift(req.body.issue);
  }

  const issueArrayLength = verificationDetails.issues.issueStatement.length;

  verificationDetails.issues.issuesRaised = issueArrayLength;

  verificationDetails.isReviewed = true;

  if (issueArrayLength !== 0) {
    verificationDetails.isVerified = false;
  } else {
    verificationDetails.isVerified = true;
  }

  const updatedVerificationDetails = await verificationDetails.save();

  res.status(200).json({
    status: 'Success',
    message: 'Restaurant Verification Status Updated Successfully',
    updatedVerificationDetails,
  });
});

exports.grantRestVerificationRequest = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const verificationDetails = await RestaurantVerification.findOne({
      'restDetails.restId': req.params.restId,
    });

    if (!verificationDetails) {
      return res.status(404).json({
        status: 'Failed',
        message: `Verification Request With Restaurant ID: ${req.params.restId} Not Found!.`,
      });
    }

    if (
      verificationDetails.isReviewed === false ||
      verificationDetails.isVerified === false
    ) {
      return next(new AppError('Restaurant is Not Verified Yet!', 400));
    }

    const newRestaurant = new Restaurant({
      restId: req.params.restId,
      restName: verificationDetails.restDetails.restName,
      ownerDetails: verificationDetails.restDetails.ownerDetails,
    });

    session.startTransaction();

    const restaurant = await newRestaurant.save({ session: session });

    await Owner.updateOne(
      { 'restDetails.restId': req.params.restId },
      { verification: 'Verified', isOwner: true },
      { session: session },
    );

    await verificationDetails.remove({ session: session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: 'Success',
      message: 'Restaurant Was Created Successfully',
      restaurant,
    });
  } catch (err) {
    if (session.transaction.state === 'STARTING_TRANSACTION')
      session.abortTransaction();

    next(err);
  }
});

exports.deleteVerificationRequest = catchAsync(async (req, res, next) => {
  const verificationRequest = await RestaurantVerification.findOne({
    'restDetails.restId': req.params.restId,
  });

  if (!verificationRequest) {
    return next(
      new AppError(
        `Verification Request With Restaurant ID: ${req.params.restId} Not Found!.`,
        404,
      ),
    );
  }

  await verificationRequest.remove();

  res.json({
    status: 'Success',
    message: 'Food Data Removed Successfully.',
  });
});
