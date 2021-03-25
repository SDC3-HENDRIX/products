require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cluster = require('cluster');

const logger = require('./config/winston');
const {
  getProducts, getOneProduct, getRelatedProducts, getProductStyles,
} = require('./database');

const app = express();
const port = process.env.PORT;

app.use(compression());

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`worker ${worker.process.pid} died`);
    cluster.fork();
  })
} else {

  app.use(morgan('combined', { stream: logger.stream }));
  app.listen(port, () => {
    logger.log('info', `SDC Products listening on port ${port}`);
  });

  // default route
  app.get('/', (req, res) => {
    res.send('Hello from SDC Products endpoint');
    logger.info(typeof numCPUs);
  });

  // group of products
  app.get('/products', (req, res) => {
    const page = Number(req.query.page) || 1;
    const count = Number(req.query.count) || 5;
    const pageOffset = (page - 1) * count;

    return getProducts(pageOffset, count)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        logger.error('There was an error fetching from the database', error);
        res.status(500).send(`Error getting information on products from page ${page} and count ${count}`);
      });
  });

  // one product
  app.get('/products/:product_id/', (req, res) => {
    const productId = req.params.product_id;

    return getOneProduct(productId)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        logger.error('There was an error fetching from the database', error);
        res.status(500).send(`Error getting info on product ${productId}`);
      });
  });

  // related
  app.get('/products/:product_id/related', (req, res) => getRelatedProducts(Number(req.params.product_id))
    .then((results) => {
      const resultArray = [];

      // transform it into a bare array
      for (let i = 0; i < results.length; i += 1) {
        const current = results[i];
        resultArray.push(current.related_product_id);
      }
      res.status(200).send(resultArray);
    })
    .catch((error) => {
      logger.error('There was an error fetching from the database', error);
      res.status(500).send('Error getting related products');
    }));

  // styles
  app.get('/products/:product_id/styles', (req, res) => {
    const productId = req.params.product_id;
    return getProductStyles(productId)
      .then((results) => {
        const formattedResults = {
          product_id: req.params.product_id,
          results,
        };
        res.status(200).send(formattedResults);
      })
      .catch((error) => {
        logger.error(`There was an error fetching styles for product ${productId}`, error);
        res.status(500).send(`There was an error fetching styles for product ${productId}`);
      });
  });
}
