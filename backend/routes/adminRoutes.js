const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/:adminId/:password', adminController.getAllVerificationRequests);

router.get(
  '/:adminId/:password/:restId',
  adminController.getRestVerificationRequest,
);

router.patch(
  '/:adminId/:password/:restId',
  adminController.reviewRestVerificationRequest,
);

router.post(
  '/:adminId/:password/:restId',
  adminController.grantRestVerificationRequest,
);

router.delete(
  '/:adminId/:password/:restId',
  adminController.deleteVerificationRequest,
);

module.exports = router;
