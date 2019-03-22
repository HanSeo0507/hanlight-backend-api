import * as bodyParser from 'body-parser';
import * as Debug from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';

import CustomError from '@Middleware/error/customError';
import ErrorMiddleware from '@Middleware/error/errorMiddleware';
import apiController from 'routes/apiController';
import { connect } from './database/index';

dotenv.config();

const app: express.Application = express();
const debug = Debug('hanlight');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api', apiController);

app.use((req, res, next) => {
  // err.status = 404;
  next(new CustomError({ name: 'Not_Found' }));
});

app.use(ErrorMiddleware);

process.on('uncaughtException', err => {
  console.error(err);
  debug('Caught exception: %j', err);
  process.exit(1);
});

connect(false); // database connection

export default app;
