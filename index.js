const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`SDC Products listening on port ${port}`);
});

app.use(morgan('combined'));

// default route
app.get('/', (req, res) => {
  res.status(200).send('Hello from SDC Products endpoint');
});