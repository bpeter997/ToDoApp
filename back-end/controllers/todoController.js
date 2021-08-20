const factory = require('./handlerFactory');
const ToDo = require('./../models/toDoModel')

exports.getAllTodos = factory.getAll(ToDo);