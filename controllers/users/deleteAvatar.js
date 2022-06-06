const { User } = require('../../models');
const { createAvatar } = require('../../services/avatarService');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const deleteAvatar = async (req, res) => {
  const { _id, email } = req.user;
  const avatarUrl = createAvatar(email);
  const user = await User.findByIdAndUpdate(_id, { avatarUrl }, { new: true });
  return res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      user: {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      message: `User avatar ${MESSAGE.DELETED_SUCCESSFUL}`,
    },
  });
};

module.exports = deleteAvatar;
