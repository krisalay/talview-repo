import app from './config/express';
// import mongoose from './config/mongoose';
import { setupClusters } from './config/cluster';

setupClusters();
// mongoose.connect();

module.exports = app;
