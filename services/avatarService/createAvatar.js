const gravatar = require('gravatar');

const createAvatar = email =>
  gravatar.url(email, { s: '150', r: 'g', d: 'wavatar' }, true);

module.exports = createAvatar;

// const { createAvatar: avatar } = require('@dicebear/avatars');
// const style = require('@dicebear/avatars-initials-sprites');

// const createAvatar = name =>
//   avatar(style, {
//     seed: `${name}`,
//     dataUri: true,
//     chars: 2,
//   });

// module.exports = createAvatar;
