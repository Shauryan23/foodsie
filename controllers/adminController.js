const RestaurantVerification = require('../models/RestaurantVerification');
const Restaurant = require('../models/Restaurant');

exports.getAllVerificationRequests = async (req, res) => {
  try {
    const verRequests = await RestaurantVerification.find();

    res.status(200).json({
      status: 'Success',
      message: 'Restaurant Verification Requests Data Retrieved Successfully!',
      verRequests,
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
    const restRequest = await RestaurantVerification.find({
      restId: req.params.restId,
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

exports.grantRestVerificationRequest = async (req, res) => {
  try {
    if (!(req.body.isReviewed === false || req.body.isVerified === false)) {
      res.send('Restaurant is Not Verifier Yet!');

      const newRestaurant = new Restaurant({
        restDetails: req.body.restDetails,
      });

      const restaurant = await newRestaurant.save();

      res.status(201).json({
        status: 'Success',
        message: 'Restaurant Was Setup Successfully',
        restaurant,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Server Error: Error Setting Up The Restaurant',
      err,
    });
  }
};

exports.reviewRestVerificationRequest = async (req, res) => {
  try {
    const verStatus = await RestaurantVerification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json(verStatus);
  } catch (err) {
    res.status(503).json({
      status: 'failed',
      message: 'Server Error: Data Updation Process Failed.',
      err,
    });
  }
};

exports.deleteVerificationRequest = async (req, res) => {
  try {
    const verRequest = await RestaurantVerification.findById(req.params.id);

    if (!verRequest) {
      return res.status(404).json({ msg: 'Food Data Not Found!' });
    }

    await RestaurantVerification.remove();

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
