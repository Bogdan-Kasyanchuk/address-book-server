const router = require('express').Router();
const { register, login, logout } = require('../../controllers/auth');
const { authToken, validation, tryCatchWrapper } = require('../../middlewares');
const {
  registerUserJoiSchema,
  loginUserJoiSchema,
} = require('../../services/joiSchemas');

router
  .post(
    '/register',
    validation('body', registerUserJoiSchema),
    tryCatchWrapper(register),
  )
  .post(
    '/login',
    validation('body', loginUserJoiSchema),
    tryCatchWrapper(login),
  )
  .get('/logout', authToken, tryCatchWrapper(logout));

module.exports = router;
