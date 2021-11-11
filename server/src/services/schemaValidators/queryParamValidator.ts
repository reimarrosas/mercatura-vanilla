import joi from 'joi';

export default joi.object({
  search: joi.string()
              .trim()
              .allow('')
              .required(),
  limit: joi.string()
            .trim()
            .pattern(new RegExp('^[0-9]+$'))
            .required(),
  offset: joi.string()
              .trim()
              .pattern(new RegExp('[0-9]+'))
              .required(),
  recount: joi.string()
              .trim()
              .pattern(new RegExp('^(true|false)$'))
              .required()
});