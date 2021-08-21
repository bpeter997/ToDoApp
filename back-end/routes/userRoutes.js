const express = require('express');
const UserRoles = require('../consts/userRoles');
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo(UserRoles.ADMIN), userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(authController.restrictTo(UserRoles.ADMIN), userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;