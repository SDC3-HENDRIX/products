const express = require('express');
const morgan = require('morgan');
const {
  getProducts, getOneProduct, getRelatedProducts, getProductStyles,
} = require('./database/query');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.listen(port, () => {
  console.log(`SDC Products listening on port ${port}`);
});

// default route
app.get('/', (req, res) => {
  res.send('Hello from SDC Products endpoint');
});

// group of products
app.get('/products', (req, res) => {
  const page = Number(req.query.page);
  const count = Number(req.query.count);
  let pageOffset = (page - 1) * count;

  return getProducts(pageOffset, count)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.error('There was an error fetching from the database', error);
      res.status(500).send(`Error getting information on products from page ${page} and count ${count}`);
    });
});

// one product
app.get('/products/:product_id/', (req, res) => {
  const product = Number(req.params.product_id);

  return getOneProduct(product)
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.error('There was an error fetching from the database', error);
      res.status(500).send(`Error getting info on product ${product}`);
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
    console.error('There was an error fetching from the database', error);
    res.status(500).send('Error getting related products');
  }));

// styles
app.get('/products/:product_id/styles', (req, res) => {
  const productId = Number(req.params.product_id);

  return getProductStyles(productId)
    .then((results) => {
      // Adds product ID back
      for (var i = 0; i < results.length; i++) {
        if (results[i].sale_price === null) {
          results[i].sale_price = '0';
        }
      }

      const formattedResults = {
        product_id: req.params.product_id,
        results,
      };

      res.status(200).send(formattedResults);
    })
    .catch((error) => {
      console.error(`There was an error fetching styles for product ${productId}`, error);
      res.status(500).send(`There was an error fetching styles for product ${productId}`);
    });
});
