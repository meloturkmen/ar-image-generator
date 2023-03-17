import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import config from '../config.json';
import { getFilesWithKeyword } from './utils/getFilesWithKeyword';

const app: Express = express();




// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();


/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development' || config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors({
    origin: ['http://localhost:3000','https://fabulous-macaron-23ebff.netlify.app'],
    credentials: true

  }));
}

// Handle security and origin in production
if (process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
  console.log('app is running on production');


  app.use(helmet());

  app.use(express.static(path.join(__dirname, '../../client-2/build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client-2/build', 'index.html'));
  });

}

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

getFilesWithKeyword('router', __dirname + '/app').forEach((file: string) => {
  const { router } = require(file);
  app.use('/api/v1', router);
})
/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(500).json({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  });
});

export default app;