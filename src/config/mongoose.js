import mongoose from 'mongoose';
import { mongo } from './vars';

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

mongoose.connection.on('connected', () => {
  console.info('Mongoose default connection opened');
});

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}
exports.connect = () => {
  mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useMongoClient: true,
  });
  return mongoose.connection;
};
