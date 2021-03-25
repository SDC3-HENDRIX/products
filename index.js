require('dotenv').config();
const numCPUs = require('os').cpus().length;
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cluster = require('cluster');
const logger = require('./config/winston');
const products = require('./router');

const app = express();
const port = process.env.PORT;

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.fork().on('exit', (code, signal) => {
    if (signal) {
      logger.debug(`Worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      logger.error(`Worker exited with error code: ${code}`);
    } else {
      logger.debug('Worker exited succesfully');
    }
  });
} else {
  // Start the server
  app.listen(port, () => {
    logger.info(`SDC Products listening on port ${port}`);
  });

  logger.debug(`Worker ${process.pid} started`);
}

// global middleware
app.use(compression());
app.use(morgan('short', { stream: logger.stream }));

// default route
app.get('/', (res) => {
  res.send('SDC Products endpoint is online');
});

// products route
app.use('/products', products);
