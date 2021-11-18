import joi from 'joi';

const numberRegex = new RegExp('[0-9]+');

export default joi.object({
  category: joi.string()
                .trim()
                .min(4)
                .required(),
  limit: joi.string()
            .trim()
            .pattern(numberRegex),
  offset: joi.string()
              .trim()
              .pattern(numberRegex),
  recount: joi.string()
              .trim()
              .pattern(new RegExp('^(true|false)$'))
              .required()
});