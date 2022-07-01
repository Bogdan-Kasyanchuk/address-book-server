const gravatar = require('gravatar');

const createAvatar = email =>
  gravatar.url(email, { s: '150', r: 'g', d: 'wavatar' }, true);

module.exports = createAvatar;
