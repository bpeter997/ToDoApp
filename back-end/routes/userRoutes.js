const express = require('express');
const UserRoles = require('../consts/userRoles');
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');
const multerController = require('./../controllers/multerController');


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser)
      .patch('/updateMe', multerController.uploadProfilePicture, userController.updateMe)

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;