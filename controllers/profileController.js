const mongoose = require('mongoose');

const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const Profile = require('../models/Profile');

exports.addProfile = catchAsync(async (req, res, next) => {
  const newProfile = new Profile({
    user: req.user.id,
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    age: req.body.age,
    address: req.body.address,
  });

  const profile = await newProfile.save();

  res.status(201).json({
    status: 'Success',
    profile,
  });
});

exports.editProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  if (!profile) {
    return next(new AppError('No Profile Found!', 400));
  }

  res.status(200).json({
    status: 'Success',
    profile,
  });
});

exports.removeAddress = catchAsync(async (req, res, next) => {
  const profile = await Profile.findById(req.body);

  //profile.address =
  // Find a way to remove the desired address and also way to update
});
