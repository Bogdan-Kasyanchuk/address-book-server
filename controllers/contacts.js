const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const { Contact } = require("../models/contact");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let findParam = null;
  if (favorite === true || !favorite === false) {
    findParam = { $and: [{ owner: _id }, { favorite }] };
  } else {
    findParam = { owner: _id };
  }
  const contacts = await Contact.find(findParam, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  return res.json({ status: "success", code: 200, data: { contacts } });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.contactId,
    owner: req.user._id,
  }).populate("owner", "_id name email");
  if (contact) {
    return res.json({ status: "success", code: 200, data: { contact } });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const avatarUrl = gravatar.url(req.body.email, { s: "200" }, true);
  const contact = await Contact.create({
    ...req.body,
    avatarUrl,
    owner: req.user._id,
  });
  return res
    .status(201)
    .json({ status: "success", code: 201, data: { contact } });
};

const updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
      owner: req.user._id,
    },
    req.body,
    { new: true }
  ).populate("owner", "_id name email");
  if (contact) {
    return res.json({ status: "success", code: 200, data: { contact } });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
  const contact = await Contact.findOneAndRemove({
    _id: req.params.contactId,
    owner: req.user._id,
  });
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

const updateContactFavorite = async (req, res) => {
  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
      owner: req.user._id,
    },
    { favorite },
    { new: true }
  ).populate("owner", "_id name email");
  if (contact) {
    return res.json({ status: "success", code: 200, data: { contact } });
  } else {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
};

const updateContactAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const { contactId } = req.params;
  try {
    const resultUpload = path.join(
      __dirname,
      "../",
      "public",
      "avatars",
      `${contactId}_${originalname}`
    );
    await fs.rename(tmpUpload, resultUpload);
    const avatarUrl = path.join(
      "public",
      "avatars",
      `${contactId}_${originalname}`
    );
    const avatar = await Jimp.read(avatarUrl);
    await avatar
      .autocrop()
      .cover(
        200,
        200,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .quality(60)
      .writeAsync(avatarUrl);
    const contact = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: req.user._id,
      },
      { avatarUrl },
      { new: true }
    ).populate("owner", "_id name email");
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    } else {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateContactFavorite,
  updateContactAvatar,
};
