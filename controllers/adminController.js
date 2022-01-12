const mongoose = require('mongoose');

const RestaurantVerification = require('../models/RestaurantVerification');
const Restaurant = require('../models/Restaurant');
const Owner = require('../models/Owner');

exports.getAllVerificationRequests = async (req, res) => {
  try {
    const verificationRequests = await RestaurantVerification.find();

    res.status(200).json({
      status: 'Success',
      message:
        'All Restaurant Verification Requests Data Retrieved Successfully!',
      verificationRequests,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Server Error: Failed to Retrieve Data from Server!',
      err,
    });
  }
};

exports.getRestVerificationRequest = async (req, res) => {
  try {
    const restRequest = await RestaurantVerification.findOne({
      'restDetails.restId': req.params.restId,
    });

    if (!restRequest) {
      return res.status(404).json({
        status: 'Failed',
        message: 'No Request Found!',
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Restaurant Verification Request Retrieved Successfully!',
      restRequest,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Server Error: Failed to Retrieve Data from Server!',
      err,
    });
  }
};

exports.reviewRestVerificationRequest = async (req, res) => {
  try {
    const verificationDetails = await RestaurantVerification.findOne({
      'restDetails.restId': req.params.restId,
    });

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
  } catch (err) {
    res.status(503).json({
      status: 'failed',
      message: 'Server Error: Data Updation Process Failed.',
      err,
    });
  }
};

exports.grantRestVerificationRequest = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    // const ownerDetails = await Owner.findOne({
    //   'restDetails.restId': req.params.restId,
    // });

    const verificationDetails = await RestaurantVerification.findOne({
      'restDetails.restId': req.params.restId,
    });

    if (
      verificationDetails.isReviewed === false ||
      verificationDetails.isVerified === false
    ) {
      return res.json({
        status: 'Failed',
        message: 'Restaurant is Not Verified Yet!',
      });
    }

    const newRestaurant = new Restaurant({
      restId: req.params.restId,
      restName: verificationDetails.restDetails.restName,
      ownerDetails: verificationDetails.restDetails.ownerDetails,
    });

    // ownerDetails.verification = 'Verified';
    // ownerDetails.isOwner = true;

    session.startTransaction();

    const restaurant = await newRestaurant.save({ session: session });

    // await ownerDetails.save({ session: session });

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
    session.abortTransaction();

    res.status(500).json({
      status: 'Failed',
      message: 'Server Error: Error in Setting up the Restaurant',
      err,
    });
  }
};

exports.deleteVerificationRequest = async (req, res) => {
  try {
    const verificationRequest = await RestaurantVerification.findOne({
      'restDetails.restId': req.params.restId,
    });

    if (!verificationRequest) {
      return res.status(404).json({ msg: 'Food Data Not Found!' });
    }

    await verificationRequest.remove();

    res.json({
      status: 'Success',
      message: 'Food Data Removed Successfully.',
    });
  } catch (err) {
    res.json({
      status: 'Failed',
      message: 'Data Removal Process Failed',
      err,
    });
  }
};
