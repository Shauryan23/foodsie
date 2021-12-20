const dotenv = require('dotenv');

dotenv.config({ path: './util/config.env' });

const app = require('./app');
const connectDB = require('./util/db');

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}...`);
});
