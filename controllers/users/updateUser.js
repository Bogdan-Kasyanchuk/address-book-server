const { unlink } = require('fs/promises');
const { User } = require('../../models');
const { updateAvatar } = require('../../services/avatarService');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name } = req.body;
  let findParam = null;
  try {
    if (req?.file?.path) {
      const secureUrl = await updateAvatar(req.file.path, _id, _id);
      findParam = { name, avatarUrl: secureUrl };
      await unlink(req.file.path);
    } else {
      findParam = { name };
    }
    const user = await User.findByIdAndUpdate(
      _id,
      { ...findParam },
      { new: true },
    );
    return res.json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        user: {
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
        message: `User ${MESSAGE.UPDATED_SUCCESSFUL}`,
      },
    });
  } catch (error) {
    if (req?.file?.path) {
      await unlink(req.file.path);
    }
    next(error);
  }
};

module.exports = updateUser;
