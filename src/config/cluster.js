import os from 'os';
import cluster from 'cluster';
import app from './express';

const numCPUs = os.cpus().length;

function setupClusters() {
  if (cluster.isMaster) {
    console.info(`Master ${process.pid} is running`);
    console.info(`Master cluster setting up ${numCPUs} workers...`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.info(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
      console.info('Starting a new worker');
      cluster.fork();
    });
    cluster.on('online', (worker) => {
      console.info(`Worker ${worker.process.pid} is online`);
    });
  } else {
    app.listen(process.env.PORT, () => {
      console.info(`Server started on port ${process.env.PORT} (${process.env.NODE_ENV})`);
    });
  }
}

module.exports = {
  setupClusters,
};
