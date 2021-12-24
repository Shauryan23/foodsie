const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = require('./app');
const connectDB = require('./util/database');

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}...`);
});
