const mongoose = require('mongoose');

const User = require('../models/User');
const Owner = require('../models/Owner');
const RestaurantVerification = require('../models/RestaurantVerification');

exports.addUser = async (req, res) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
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
  const session = await mongoose.startSession();

  try {
    const userDetails = await User.findById(req.params.id).select(
      '-_id -metaData -__v',
    );

    const newOwner = new Owner({
      userName: userDetails.userName,
      email: userDetails.email,
      password: userDetails.password,
      restDetails: {
        restId: mongoose.Types.ObjectId(),
        restName: req.body.restName,
      },
    });

    session.startTransaction();

    await User.findByIdAndDelete(req.params.id, { session: session });
    const owner = await newOwner.save({ session: session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: 'Success',
      owner,
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

exports.addRestaurant = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Failed Storing the Data. Please Try Again Later',
      err,
    });
  }
};

// Add a more descriptive Error to notify if the user has resgistered as owner
exports.assignVerification = async (req, res) => {
  try {
    const query = await Owner.findById(req.params.id).select('restDetails');

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
      message: 'Applied For Verification',
      restVerify,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Verification Request Failed!',
      err,
    });
  }
};

// "userName": "Shauryan",
// "email": "Shauryan@gmail.com",
// "password": "Shauryan123"
