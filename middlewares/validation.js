const { STATUS, HTTP_CODE } = require('../helpers/constants');

const validation = (arg, schema) => async (req, res, next) => {
  let request;
  if (arg === 'body') request = req.body;
  if (arg === 'params') request = req.params;
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    console.log('---VALIDATION_ERROR---', error.details);
    return res.status(HTTP_CODE.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.BAD_REQUEST,
      payload: {
        message: error.message,
      },
    });
  }
};

module.exports = validation;
