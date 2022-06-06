const Joi = require('joi');
const { nameRegex, emailRegex, passwordRegex } = require('../../helpers/regex');

const registerUserJoiSchema = Joi.object({
  name: Joi.string().min(3).pattern(nameRegex).required().messages({
    'string.base': 'The name must be a string!',
    'string.min': 'The name must contain min 3 characters!',
    'string.pattern.base': 'Enter the desired name format!',
    'string.empty': 'The name field cannot be empty!',
    'any.required': 'The name is a required field!',
  }),
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

module.exports = registerUserJoiSchema;
