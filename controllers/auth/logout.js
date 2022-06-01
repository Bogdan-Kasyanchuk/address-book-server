const { User } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  return res.status(HTTP_CODE.NO_CONTENT).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.NO_CONTENT,
    payload: {
      message: `User ${MESSAGE.LOGOUT_SUCCESSFUL}`,
    },
  });
};

module.exports = logout;
