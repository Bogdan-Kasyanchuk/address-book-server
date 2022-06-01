const Joi = require('joi');
const { emailRegex, passwordRegex } = require('../../helpers/regex');

const loginUserJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.base': 'The email must be a string!',
    'string.pattern.base': 'Enter the desired email format!',
    'string.empty': 'The email field cannot be empty!',
    'any.required': 'The email is a required field!',
  }),
  password: Joi.string().min(8).pattern(passwordRegex).required().messages({
    'string.base': 'The password must be a string!',
    'string.min': 'The password must contain min 8 characters!',
    'string.pattern.base': 'Enter the desired password format!',
    'string.empty': 'The password field cannot be empty!',
    'any.required': 'The password is a required field!',
  }),
});

module.exports = loginUserJoiSchema;
