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

const allowedOrigins = [
  'https://track-your-day.netlify.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

app.options('*', cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

app.use(router);
app.use(errorMiddleware);

const port = 2000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


