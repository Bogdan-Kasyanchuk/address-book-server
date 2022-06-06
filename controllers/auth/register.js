const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const { createAvatar } = require('../../services/avatarService');
const tokenService = require('../../services/tokenService');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(HTTP_CODE.CONFLICT).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.CONFLICT,
      payload: {
        message: 'User with this email already exists',
      },
    });
  } else {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarUrl = createAvatar(email);
    const { _id } = await User.create({
      name,
      email,
      password: hashPassword,
      avatarUrl,
    });
    const token = tokenService(_id);
    const user = await User.findByIdAndUpdate(_id, { token }, { new: true });
    return res.status(HTTP_CODE.CREATED).json({
      status: STATUS.CREATED,
      code: HTTP_CODE.CREATED,
      payload: {
        user: {
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
        token,
        message: `User ${MESSAGE.REGISTER_SUCCESSFUL}`,
      },
    });
  }
};

module.exports = register;
