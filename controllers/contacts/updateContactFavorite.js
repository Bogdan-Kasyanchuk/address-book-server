const { Contact } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const updateContactFavorite = async (req, res) => {
  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
      owner: req.user._id,
    },
    { favorite },
    { new: true },
  ).populate('owner', '_id name email');
  if (contact) {
    return res.json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        contact,
        message: `Contact favorite ${MESSAGE.UPDATED_SUCCESSFUL}`,
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

module.exports = updateContactFavorite;
