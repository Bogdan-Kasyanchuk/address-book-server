const { Contact } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 200, favorite } = req.query;
  const skip = (page - 1) * limit;
  const numberLimit = Number(limit);
  let findParam = null;
  if (favorite === true || !favorite === false) {
    findParam = { $and: [{ owner: _id }, { favorite }] };
  } else {
    findParam = { owner: _id };
  }
  const contacts = await Contact.find(
    findParam,
    {},
    {
      skip,
      limit: numberLimit,
    },
  ).populate('owner', '_id name email');
  const shownDocuments = contacts.length;
  const totalDocuments = await Contact.countDocuments(findParam);
  return res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      contacts,
      countDocuments: {
        page: Number(page),
        limitDocuments: numberLimit,
        totalDocuments,
        shownDocuments,
      },
      message: `Contacts ${MESSAGE.LOADED_SUCCESSFUL}`,
    },
  });
};

module.exports = getContacts;
