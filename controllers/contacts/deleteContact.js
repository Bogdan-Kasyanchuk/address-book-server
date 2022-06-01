const { Contact } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const deleteContact = async (req, res) => {
  const contact = await Contact.findOneAndRemove({
    _id: req.params.contactId,
    owner: req.user._id,
  });
  if (contact) {
    return res.json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        message: `Contact ${MESSAGE.DELETED_SUCCESSFUL}`,
      },
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
};

module.exports = deleteContact;
