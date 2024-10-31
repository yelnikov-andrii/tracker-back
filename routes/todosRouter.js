import express from 'express';
import { catchError } from '../utils/catchError.js';
import { todosController } from '../controllers/todosController.js';

export const todosRouter = express.Router();

todosRouter.post('/todos', catchError(todosController.createTodo));
todosRouter.get('/todos/:userId', catchError(todosController.getTodos));
todosRouter.delete('/todos/:todoId', catchError(todosController.deleteTodo));
todosRouter.patch('/todos/:todoId', catchError(todosController.changeTodo));