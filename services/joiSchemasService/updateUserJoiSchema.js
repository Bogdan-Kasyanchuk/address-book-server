const Joi = require('joi');
const { nameRegex } = require('../../helpers/regex');

const updateUserJoiSchema = Joi.object({
  name: Joi.string().min(3).pattern(nameRegex).optional().messages({
    'string.base': 'The name must be a string!',
    'string.min': 'The name must contain min 3 characters!',
    'string.pattern.base': 'Enter the desired name format!',
    'string.empty': 'The name field cannot be empty!',
  }),
});

module.exports = updateUserJoiSchema;
