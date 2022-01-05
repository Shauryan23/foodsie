const mongoose = require('mongoose');
const User = require('../models/User');
const Owner = require('../models/Owner');
const RestaurantVerification = require('../models/RestaurantVerification');

exports.addUser = async (req, res) => {
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
};

exports.addOwner = async (req, res) => {
  try {
    const userDetails = await User.findById(req.params.id).select(
      '-_id -metaData -__v',
    );
    const newOwner = new Owner({
      userName: userDetails.userName,
      isOwner: false,
      // restName: req.body.restName,
      restOwned: req.body.restOwned,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await User.findByIdAndDelete(req.params.id, { session: session });
    const owner = await newOwner.save({ session: session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      status: 'Success',
      owner,
    });

    // session.withTransaction(
    //   async () => {
    //     await User.findByIdAndDelete(req.params.id);
    //     res.status(201).json({
    //       status: 'Success',
    //       owner,
    //     });
    //   },
    //   { session: session },
    // );
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Failed Storing the Data. Please Try Again Later',
      err,
    });
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
