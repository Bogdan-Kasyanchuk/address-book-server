const app = require('./app');
const db = require('./config/db');

const { PORT } = process.env;

db.then(() =>
  app.listen(PORT, () =>
    console.log(`Server started successful. Use our API on port: ${PORT}`),
  ),
).catch(error =>
  console.log(`Failed to connect to database. Error message: ${error.message}`),
);
