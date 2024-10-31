import express from 'express';
import cors from 'cors';
import { router } from './routes/index.js';
import { errorMiddleware } from './exceptions/errorMiddleware.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true} ));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(router);
app.use(errorMiddleware);

const port = 2000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


