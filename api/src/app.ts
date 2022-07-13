import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import { repos } from './routes/repos';
import { terrible } from './middleware/terrible';
import { AppError } from './models/AppError';
import axios from 'axios';

// CORS header configuration
const corsOptions = {
  methods: 'GET',
  allowedHeaders: 'Content-Type,Authorization',
};

export const app = express();

// Routes. Note these will fail about 25% due to "terrible" middleware.
app.use('/repos', terrible(), cors(corsOptions), repos);

// error handling middleware should be loaded after the loading the routes
app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof AppError ? err.status : 500;

  const formattedError: { status: number; message: string } = {
    status,
    message: err.message,
  };

  res.status(status);
  res.json(formattedError);
});


//I tried to make a call with Express, but it unfortuanlety wasn't successful. Ithen tried to make a call with axios, and it returned the json data in my command line. I didn't figure out how to get it to display on the page...
  // axios({
  //   method: 'GET',
  //   url: `https://api.github.com/users/silverorange/repos`,
  //   params: {
  //     fork: false,
  //   }
  // }).then((res) => {
  //   console.log(res.data);
  // });

