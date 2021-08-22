const factory = require('./handlerFactory');
const ToDo = require('./../models/toDoModel');
const catchAsync = require('./../utils/catchAsync');

exports.getMyTodos = catchAsync(async (req, res, next) => {
  const doc = await ToDo.findAll({
    where: { email: req.user.email }
  });

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
});

exports.getAllTodos = factory.getAll(ToDo);
exports.getToDo = factory.getOne(ToDo);
exports.updateToDo = factory.updateOne(ToDo);
exports.deleteToDo = factory.deleteOne(ToDo);
exports.createTodo = factory.createOne(ToDo);
