import joi from 'joi';

export default joi.object({
  user_email: joi.string()
            .trim()
            .email()
            .required(),
  user_password: joi.string()
              .trim()
              .min(6)
              .required()
})