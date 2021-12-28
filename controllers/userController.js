const { User, Owner } = require('../models/User');
// const Owner = require('../models/Owner');

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
};
