const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'Failed',
      message: 'Authorization Denied',
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({
      status: 'Failed',
      message: 'Token is not valid',
    });
  }

  next();
};
