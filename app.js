const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  res.send('<h1>Food Delivery Website</h1>');
});

app.listen(3000, () => {
  console.log('Server Running...');
});
