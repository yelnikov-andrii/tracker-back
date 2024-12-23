import express from 'express';
import { catchError } from '../utils/catchError.js';
import { todosWithoutTimeController } from '../controllers/todosWithoutTime.js';

export const todosWithoutTimeRouter = express.Router();

todosWithoutTimeRouter.post('/todos-without-time', catchError(todosWithoutTimeController.createTodo));
todosWithoutTimeRouter.get('/todos-without-time/:userId', catchError(todosWithoutTimeController.getTodos));
todosWithoutTimeRouter.delete('/todos-without-time/:todoId', catchError(todosWithoutTimeController.deleteTodo));
todosWithoutTimeRouter.delete('/todos-without-time', catchError(todosWithoutTimeController.deleteAll));
todosWithoutTimeRouter.patch('/todos-without-time/:todoId', catchError(todosWithoutTimeController.changeTodo));
todosWithoutTimeRouter.patch('/todos-without-time', catchError(todosWithoutTimeController.toggleTodos));