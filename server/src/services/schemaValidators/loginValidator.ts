import joi from 'joi';

export default joi.object({
  email: joi.string()
            .trim()
            .email()
            .required(),
  password: joi.string()
              .trim()
              .min(6)
              .required()
})