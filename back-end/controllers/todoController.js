const factory = require('./handlerFactory');
const ToDo = require('./../models/toDoModel')

exports.getAllTodos = factory.getAll(ToDo);
exports.getToDo = factory.getOne(ToDo);
exports.updateToDo = factory.updateOne(ToDo);
exports.deleteToDo = factory.deleteOne(ToDo);