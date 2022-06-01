const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../helpers/constants');

const { SECRET_KEY } = process.env;

const authToken = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (bearer !== 'Bearer' || !user || !user.token) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        status: STATUS.ERROR,
        code: HTTP_CODE.UNAUTHORIZED,
        payload: {
          message: MESSAGE.NOT_AUTHORIZED,
        },
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    if (
      error.message === MESSAGE.INVALID_SIGNATURE ||
      error.message === MESSAGE.JWT_EXPIRED
    ) {
      error.status = HTTP_CODE.UNAUTHORIZED;
    }
    next(error);
  }
};

module.exports = authToken;
