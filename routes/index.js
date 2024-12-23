import express from 'express';
import { authRouter } from './authRouter.js';
import { todosRouter } from './todosRouter.js';
import { todosWithoutTimeRouter } from './todosWithoutTime.js';

export const router = express.Router();

router.use(authRouter);
router.use(todosRouter);
router.use(todosWithoutTimeRouter);
