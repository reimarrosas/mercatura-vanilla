import joi from 'joi';

const numberRegex = new RegExp('^[0-9]+$');

export default joi.object({
  id: joi.number()
          .min(1),
  userId: joi.number()
              .min(1),
  productId: joi.number()
                .min(1),
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