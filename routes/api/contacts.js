const router = require('express').Router();
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  updateContactFavorite,
  deleteContactAvatar,
} = require('../../controllers/contacts');
const {
  authToken,
  validation,
  tryCatchWrapper,
  upload,
} = require('../../middlewares');
const {
  createContactJoiSchema,
  updateContactJoiSchema,
  favoriteContactJoiSchema,
  idContactJoiSchema,
} = require('../../services/joiSchemas');

router
  .get('/', authToken, tryCatchWrapper(getContacts))
  .post(
    '/',
    [authToken, validation('body', createContactJoiSchema)],
    tryCatchWrapper(createContact),
  )
  .put(
    '/:contactId',
    [
      authToken,
      validation('params', idContactJoiSchema),
      upload.single('avatar'),
      validation('body', updateContactJoiSchema),
    ],
    tryCatchWrapper(updateContact),
  )
  .delete(
    '/:contactId',
    [authToken, validation('params', idContactJoiSchema)],
    tryCatchWrapper(deleteContact),
  )
  .patch(
    '/:contactId/favorite',
    [
      authToken,
      validation('params', idContactJoiSchema),
      validation('body', favoriteContactJoiSchema),
    ],
    tryCatchWrapper(updateContactFavorite),
  )
  .delete(
    '/:contactId/avatars',
    authToken,
    tryCatchWrapper(deleteContactAvatar),
  );

module.exports = router;
