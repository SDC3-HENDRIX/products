const express = require('express');
const morgan = require('morgan');
const { getProducts, getOneProduct, getRelatedProducts } = require('./database/query');

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

app.get('/products', (req, res) => {
  const page = Number(req.query.page);
  const count = Number(req.query.count);

  return getProducts(page, count)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.error('There was an error fetching from the database', error);
      res.status(500).send(`Error getting information on products from page ${page} and count ${count}`);
    });
});

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
app.get('/products/:product_id/related', (req, res) => {
  return getRelatedProducts(Number(req.params.product_id))
    .then((results) => {
      let resultArray = [];
      
      // transform it into a bare array
      for (var i = 0; i < results.length; i++) {
        let current = results[i];
        resultArray.push(results[i]['related_product_id']);
      }

      res.status(200).send(resultArray);
    })
    .catch((error) => {
      console.error('There was an error fetching from the database', error);
      res.status(500).send('Error getting related products');
    });
});