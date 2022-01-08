const RestaurantVerification = require('../models/RestaurantVerification');
const Restaurant = require('../models/Restaurant');

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

    verificationDetails.issues.issueStatement.unshift(req.body.issue);

    const issueArrayLength = verificationDetails.issues.issueStatement.length;

    verificationDetails.issues.issuesRaised = issueArrayLength;

    verificationDetails.isReviewed = true;

    if (!issueArrayLength.isEmpty) {
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
  try {
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
      restId: req.body.restId,
      restName: verificationDetails.restDetails.restName,
      ownerDetails: verificationDetails.restDetails.ownerDetails,
    });

    const restaurant = await newRestaurant.save();

    res.status(201).json({
      status: 'Success',
      message: 'Restaurant Was Created Successfully',
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Server Error: Error in Creating the Restaurant',
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
