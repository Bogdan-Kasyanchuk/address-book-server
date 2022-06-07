const mongoose = require('mongoose');

const { DATA_BASE } = process.env;

const db = mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('Connected to database'));

mongoose.connection.on('error', error =>
  console.log(`Connection error: ${error}`),
);

mongoose.connection.on('disconnected', () =>
  console.log('Disconnected from database'),
);

process.on('SIGINT', async () => {
  mongoose.connection.close(() => process.exit(1));
});

module.exports = db;
