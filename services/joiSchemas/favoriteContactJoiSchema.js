const Joi = require('joi');

const favoriteContactJoiSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'boolean.base': 'The favorite must be a boolean!',
    'any.required': 'The favorite is a required field!',
  }),
});

module.exports = favoriteContactJoiSchema;
