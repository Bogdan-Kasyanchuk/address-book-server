const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateContactFavorite,
  updateContactAvatar,
} = require("../../controllers/contacts");
const {
  authToken,
  validation,
  tryCatchWrapper,
  upload,
} = require("../../middlewares");
const {
  createContactJoiSchema,
  updateContactJoiSchema,
  favoriteContactJoiSchema,
  contactJoiId,
} = require("../../models/contact");

const router = express.Router();

router
  .get("/", authToken, tryCatchWrapper(getContacts))
  .post(
    "/",
    [authToken, validation("body", createContactJoiSchema)],
    tryCatchWrapper(addContact)
  );

router
  .get(
    "/:contactId",
    [authToken, validation("params", contactJoiId)],
    tryCatchWrapper(getContactById)
  )
  .put(
    "/:contactId",
    [
      authToken,
      validation("params", contactJoiId),
      validation("body", updateContactJoiSchema),
    ],
    tryCatchWrapper(updateContact)
  )
  .delete(
    "/:contactId",
    [authToken, validation("params", contactJoiId)],
    tryCatchWrapper(deleteContact)
  )
  .patch(
    "/:contactId/favorite",
    [
      authToken,
      validation("params", contactJoiId),
      validation("body", favoriteContactJoiSchema),
    ],
    tryCatchWrapper(updateContactFavorite)
  )
  .patch(
    "/:contactId/avatars",
    [authToken, upload.single("avatar")],
    tryCatchWrapper(updateContactAvatar)
  );

module.exports = router;
