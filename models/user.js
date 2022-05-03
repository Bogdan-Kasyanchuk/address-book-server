const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
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
    password: {
      type: String,
      required: [true, "This is a required field!"],
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const namePattern = /^[a-zA-Zа-яА-Я ]+$/;
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const signupUserJoiSchema = Joi.object({
  name: Joi.string().pattern(namePattern).min(3).required().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.min": "Min 3 characters!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Min 8 characters!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
});

const loginUserJoiSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Min 8 characters!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
});

const reverifyUserJoiSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.pattern.base": "Enter the desired format!",
    "string.empty": "This field cannot be empty!",
    "any.required": "This is a required field!",
  }),
});

module.exports = {
  User,
  signupUserJoiSchema,
  loginUserJoiSchema,
  reverifyUserJoiSchema,
};
