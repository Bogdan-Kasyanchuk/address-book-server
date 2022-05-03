const express = require("express");
const {
  current,
  updateAvatar,
  verifyEmail,
  reverifyEmail,
} = require("../../controllers/users");
const {
  authToken,
  validation,
  tryCatchWrapper,
  upload,
} = require("../../middlewares");
const { reverifyUserJoiSchema } = require("../../models/user");

const router = express.Router();

router
  .get("/current", authToken, tryCatchWrapper(current))
  .patch(
    "/avatars",
    [authToken, upload.single("avatar")],
    tryCatchWrapper(updateAvatar)
  )
  .post(
    "/verify",
    validation("body", reverifyUserJoiSchema),
    tryCatchWrapper(reverifyEmail)
  )
  .get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));

module.exports = router;
