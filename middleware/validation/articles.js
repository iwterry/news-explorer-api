const { celebrate, Joi } = require('celebrate');

module.exports.validateCreateArticleRequest = celebrate({
  body: Joi.object({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().max('now').required(),
    source: Joi.string().required(),
    link: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  }),
  headers: Joi.object({
    'content-type': Joi.string().pattern(/^application\/json/).required(),
  }).unknown(true),
});

module.exports.validateDeleteArticleRequest = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});
