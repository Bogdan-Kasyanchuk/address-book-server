const router = require('express').Router();
const {
  current,
  updateUser,
  deleteAvatar,
} = require('../../controllers/users');
const {
  authToken,
  validation,
  tryCatchWrapper,
  upload,
} = require('../../middlewares');
const { updateUserJoiSchema } = require('../../services/joiSchemasService');

router
  .get('/current', authToken, tryCatchWrapper(current))
  .put(
    '/',
    [
      authToken,
      upload.single('avatar'),
      validation('body', updateUserJoiSchema),
    ],
    tryCatchWrapper(updateUser),
  )
  .delete('/avatars', authToken, tryCatchWrapper(deleteAvatar));

module.exports = router;
