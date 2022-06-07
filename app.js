const express = require('express');
// const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { authRouter, usersRouter, contactsRouter } = require('./routes/api');
const { limiter } = require('./middlewares/');
const {
  LIMIT,
  STATUS,
  HTTP_CODE,
  MESSAGE,
  SIZE,
} = require('./helpers/constants');

const app = express();

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(cors({ origin: true, credentials: true }));
app.use(limiter(LIMIT.LIMITER_WINDOWMS, LIMIT.LIMITER_MAX));
app.use(helmet());
// app.use(logger(formatsLogger));
app.use(express.json({ limit: SIZE.HALFMB }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  console.log('---ROUTES_ERROR---');
  return res.status(HTTP_CODE.NOT_FOUND).json({
    status: STATUS.ERROR,
    code: HTTP_CODE.NOT_FOUND,
    payload: {
      message: MESSAGE.NOT_FOUND,
      tooltip: MESSAGE.TOOLTIP_ROUTES,
    },
  });
});
app.use((err, req, res, next) => {
  console.log('---SERVER_ERROR---', err.stack);
  return res.status(err.status || HTTP_CODE.INTERNAL_SERVER_ERROR).json({
    status: err.status || STATUS.FAIL,
    code: err.status || HTTP_CODE.INTERNAL_SERVER_ERROR,
    payload: {
      message: err.message || MESSAGE.INTERNAL_SERVER_ERROR,
    },
  });
});

module.exports = app;
