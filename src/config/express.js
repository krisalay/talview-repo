import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { logs } from './vars';
import error from '../lib/middlewares/error';
import routes from '../lib/routes';


const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(routes);

// if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// catch 404 and forward to error handler
// app.use(error.notFound);

// error handler, send stacktrace only during development
// app.use(error.handler);

module.exports = app;
