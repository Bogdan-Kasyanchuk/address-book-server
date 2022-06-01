const Joi = require('joi');
const { nameRegex, phoneRegex, emailRegex } = require('../../helpers/regex');

const createContactJoiSchema = Joi.object({
  name: Joi.string().min(3).pattern(nameRegex).required().messages({
    'string.base': 'The name must be a string!',
    'string.min': 'The name must contain min 3 characters!',
    'string.pattern.base': 'Enter the desired name format!',
    'string.empty': 'The name field cannot be empty!',
    'any.required': 'The name is a required field!',
  }),
  phone: Joi.string().min(10).pattern(phoneRegex).required().messages({
    'string.base': 'The phone must be a string!',
    'string.min': 'The phone must contain min 10 characters!',
    'string.pattern.base': 'Enter the desired phone format!',
    'string.empty': 'The phone field cannot be empty!',
    'any.required': 'The phone is a required field!',
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.base': 'The email must be a string!',
    'string.pattern.base': 'Enter the desired email format!',
    'string.empty': 'The email field cannot be empty!',
    'any.required': 'The email is a required field!',
  }),
  address: Joi.string().empty('').optional().messages({
    'string.base': 'The address must be a string!',
  }),
  other: Joi.string().empty('').optional().messages({
    'string.base': 'The other must be a string!',
  }),
  favorite: Joi.boolean().optional().messages({
    'boolean.base': 'The favorite must be a boolean!',
  }),
  avatarUrl: Joi.string().optional().messages({
    'string.base': 'The avatarUrl must be a string!',
  }),
});

module.exports = createContactJoiSchema;
