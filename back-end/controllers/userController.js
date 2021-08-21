const factory = require('./handlerFactory');
const User = require('./../models/userModel')

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.createUser= (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not defined! Please use /signup instead'
    });
  };
  exports.getMe = (req, res, next) => {
    req.params.id = req.user.email;
    next();
  };