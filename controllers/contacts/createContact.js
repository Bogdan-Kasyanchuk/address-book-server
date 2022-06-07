const { Contact } = require('../../models');
const { createAvatar } = require('../../services/avatarService');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const createContact = async (req, res) => {
  const avatarUrl = createAvatar(req.body.email);

  const contact = await Contact.create({
    ...req.body,
    avatarUrl,
    owner: req.user._id,
  });
  return res.status(HTTP_CODE.CREATED).json({
    status: STATUS.CREATED,
    code: HTTP_CODE.CREATED,
    payload: { contact, message: `Contact ${MESSAGE.CREATED_SUCCESSFUL}` },
  });
};

module.exports = createContact;
