const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  headers: Joi.object({
    'content-type': Joi.string().pattern(/^application\/json/).required(),
  }).unknown(true),
});
