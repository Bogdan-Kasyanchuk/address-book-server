const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const tokenService = require('../../services/tokenService');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(HTTP_CODE.UNAUTHORIZED).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.UNAUTHORIZED,
      payload: {
        message: 'Email is wrong or password is wrong',
      },
    });
  } else {
    const token = tokenService(user._id);
    await User.findByIdAndUpdate(user._id, { token });
    return res.json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        user: {
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
        token,
        message: `User ${MESSAGE.LOGIN_SUCCESSFUL}`,
      },
    });
  }
};

module.exports = login;
