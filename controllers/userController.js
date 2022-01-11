const mongoose = require('mongoose');

const User = require('../models/User');
const Owner = require('../models/Owner');
const RestaurantVerification = require('../models/RestaurantVerification');
const signToken = require('../util/signToken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please Provide Email and Password.',
      });
    }

    const user = await User.findOne({ email }).select('password');

    if (!user || !(await user.checkPassword(password, user.password))) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Invalid Credentials',
      });
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: 'Success',
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Server Error: Please Try Again Later.',
    });
  }
};

exports.signupUser = async (req, res) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const user = await newUser.save();

    const token = signToken(user._id);

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server Error: Failed Storing the Data.',
      err,
    });
  }
};

exports.signupOwner = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const userDetails = await User.findById(req.params.id).select(
      '+password -_id -metaData -__v',
    );

    const newOwner = new Owner({
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
    const owner = await newOwner.save({ session: session });

    await session.commitTransaction();
    session.endSession();

    const token = signToken(owner._id);

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        owner,
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
