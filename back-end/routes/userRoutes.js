const express = require('express');
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');
const imageUploadController = require('../controllers/imageUploadController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use(authController.protect);

router
  .get('/me', userController.getMe, userController.getUser)
  .patch(
    '/updateMe',
    imageUploadController.uploadProfilePicture,
    userController.updateMe
  );

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
