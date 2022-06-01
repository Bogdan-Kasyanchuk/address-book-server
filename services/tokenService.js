const jwt = require('jsonwebtoken');
const { LIMIT } = require('../helpers/constants');

const { SECRET_KEY } = process.env;

const tokenService = id =>
  jwt.sign(
    {
      id,
    },
    SECRET_KEY,
    { expiresIn: LIMIT.TOKEN_EXPIRES },
  );

module.exports = tokenService;
