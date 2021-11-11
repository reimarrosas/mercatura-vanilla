import joi from 'joi';

const numberRegex = new RegExp('^[0-9]+$');

export default joi.object({
  id: joi.string()
          .trim()
          .pattern(numberRegex),
  userId: joi.string()
              .trim()
              .pattern(numberRegex),
  productId: joi.string()
                .trim()
                .pattern(numberRegex),
  content: joi.string()
                .trim()
                .min(1),
  sentiment: joi.string()
                .trim()
                .pattern(new RegExp('^(likes|dislikes)$')),
  limit: joi.string()
            .trim()
            .pattern(numberRegex),
  offset: joi.string()
              .trim()
              .pattern(numberRegex)
});