const express = require('express');
const morgan = require('morgan');
const { getProducts } = require('./database/query');

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
      res.status(500).send('Error');
    });
});
