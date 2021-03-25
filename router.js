const express = require('express');
const logger = require('./config/winston');

const router = express.Router();
const {
  getProducts, getOneProduct, getRelatedProducts, getProductStyles,
} = require('./database');

// group of products
router.get('/', (req, res) => {
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
router.get('/:product_id/', (req, res) => {
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
router.get('/:product_id/related', (req, res) => getRelatedProducts(Number(req.params.product_id))
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
router.get('/:product_id/styles', (req, res) => {
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

module.exports = router;
