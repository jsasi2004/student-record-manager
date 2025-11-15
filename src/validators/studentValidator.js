const Joi = require('joi');

const studentSchema = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  course: Joi.string().max(100).required(),
  marks: Joi.number().min(0).max(100).required(),
});

module.exports = studentSchema;
