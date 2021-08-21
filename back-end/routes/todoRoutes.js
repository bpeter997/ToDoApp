const express = require('express');
const todoController = require('../controllers/todoController');
const authController = require('./../controllers/authController');
const UserRoles = require('../consts/userRoles');

const router = express.Router();

router.use(authController.protect);

router.use('/myTodos', todoController.getMyTodos);

router
  .route('/:id')
  .get(todoController.getToDo)
  .patch(todoController.updateToDo)
  .delete(todoController.deleteToDo)

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(todoController.getAllTodos)
  .post(todoController.createTodo)

module.exports = router;