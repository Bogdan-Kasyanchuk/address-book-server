const getContacts = require('./getContacts');
const createContact = require('./createContact');
const updateContact = require('./updateContact');
const deleteContact = require('./deleteContact');
const updateContactFavorite = require('./updateContactFavorite');
const deleteContactAvatar = require('./deleteContactAvatar');

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  updateContactFavorite,
  deleteContactAvatar,
};
