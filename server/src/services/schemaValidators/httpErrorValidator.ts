import joi from 'joi';

export default joi.object({
  statusCode: joi.number()
                  .min(100)
                  .max(599)
                  .required(),
  name: joi.string()
            .trim()
            .min(1)
            .required(),
  message: joi.string()
              .trim()
              .min(1)
              .required(),
  stack: joi.string()
              .trim()
              .min(1)
              .optional()
});