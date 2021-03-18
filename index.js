const express = require('express');
const morgan = require('morgan');

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
