const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const idContactJoiSchema = Joi.object({
  contactId: Joi.objectId().required().messages({
    'any.required': 'The contactId is a required field!',
  }),
});

module.exports = idContactJoiSchema;
