const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "This is a required field!"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "This is a required field!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "This is a required field!"],
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      unique: false,
    },
    other: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const namePattern = /^[a-zA-Zа-яА-Я ]+$/;
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,20}(\s*)?$/;

const createContactJoiSchema = Joi.object({
  name: Joi.string().pattern(namePattern).min(3).required().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.min": "Min 3 characters!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
  phone: Joi.string().pattern(phonePattern).min(10).required().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.min": "Min 10 characters!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
  address: Joi.string().optional().messages({
    "string.empty": "This field cannot be empty!",
  }),
  other: Joi.string().optional().messages({
    "string.empty": "This field cannot be empty!",
  }),
  favorite: Joi.bool().optional(),
});

const updateContactJoiSchema = Joi.object({
  name: Joi.string().pattern(namePattern).min(3).optional().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.min": "Min 3 characters!",
    "string.empty": "This field cannot be empty!",
  }),
  phone: Joi.string().pattern(phonePattern).min(10).optional().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.min": "Min 10 characters!",
    "string.empty": "This field cannot be empty!",
  }),
  email: Joi.string().pattern(emailPattern).optional().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.empty": "This field cannot be empty!",
  }),
  address: Joi.string().optional().messages({
    "string.empty": "This field cannot be empty!",
  }),
  other: Joi.string().optional().messages({
    "string.empty": "This field cannot be empty!",
  }),
  favorite: Joi.bool().optional(),
});

const favoriteContactJoiSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "any.required": "This is a required field!" }),
});

const contactJoiId = Joi.object({
  contactId: Joi.objectId().required(),
});

module.exports = {
  Contact,
  createContactJoiSchema,
  updateContactJoiSchema,
  favoriteContactJoiSchema,
  contactJoiId,
};
