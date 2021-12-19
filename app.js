const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/foods', (req, res) => {
  res.status(200).send('Hello from server');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}...`);
});
