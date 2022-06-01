const { unlink } = require('fs/promises');
const { Contact } = require('../../models');
const { updateAvatar } = require('../../services/avatars');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  let findParam = null;
  try {
    if (req?.file?.path) {
      const secureUrl = await updateAvatar(req.file.path, contactId, _id);
      findParam = { ...req.body, avatarUrl: secureUrl };
      await unlink(req.file.path);
    } else {
      findParam = req.body;
    }
    const contact = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: _id,
      },
      { ...findParam },
      { new: true },
    ).populate('owner', '_id name email');
    if (contact) {
      return res.json({
        status: STATUS.SUCCESS,
        code: HTTP_CODE.OK,
        payload: { contact, message: `Contact ${MESSAGE.UPDATED_SUCCESSFUL}` },
      });
    } else {
      return res.status(HTTP_CODE.NOT_FOUND).json({
        status: STATUS.ERROR,
        code: HTTP_CODE.NOT_FOUND,
        payload: {
          message: `Contact ${MESSAGE.NOT_FOUND}`,
        },
      });
    }
  } catch (error) {
    if (req?.file?.path) {
      await unlink(req.file.path);
    }
    next(error);
  }
};

module.exports = updateContact;
