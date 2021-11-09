import joi from 'joi';

export default joi.object({
  user_name: joi.string()
            .trim()
            .min(1)
            .required(),
  user_email: joi.string()
            .trim()
            .email()
            .required(),
  user_password: joi.string()
                .trim()
                .min(6)
                .required()
});