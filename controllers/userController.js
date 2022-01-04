const User = require('../models/User');
const Owner = require('../models/Owner');
const RestaurantVerification = require('../models/RestaurantVerification');

exports.addUser = async (req, res) => {
  if (req.body.isOwner) {
    try {
      const newOwner = new Owner({
        userName: req.body.userName,
        restOwned: req.body.restOwned,
        isOwner: req.body.isOwner,
        restName: req.body.restName,
      });

      const owner = await newOwner.save();

      res.status(201).json({
        status: 'Success',
        owner,
      });
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: 'Server Error: Failed Storing the Data.',
        err,
      });
    }
  } else {
    try {
      const newUser = new User({
        userName: req.body.userName,
        restOwned: req.body.restOwned,
      });

      const user = await newUser.save();

      res.status(201).json({
        status: 'Success',
        user,
      });
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: 'Server Error: Failed Storing the Data.',
        err,
      });
    }
  }
};

exports.assignVerification = async (req, res) => {
  try {
    const restVerify = new RestaurantVerification({
      restDetails: req.body.restDetails,
      isReviwed: false,
      isVerified: false,
    });

    await restVerify.save();

    res.status(200).json({
      status: 'Success',
      message: 'Applied For Verification',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Verification Request Failed!',
      err,
    });
  }
};
