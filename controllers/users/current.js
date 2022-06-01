const { User } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const current = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      user: {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      token: user.token,
      message: `Current user ${MESSAGE.LOADED_SUCCESSFUL}`,
    },
  });
};

module.exports = current;
