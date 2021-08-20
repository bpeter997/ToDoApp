const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router
  .route('/')
  .get(todoController.getAllTodos)

router
  .route('/:id')
  .get(todoController.getToDo)
  .patch(todoController.updateToDo)
  .delete(todoController.deleteToDo)

module.exports = router;