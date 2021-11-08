import joi from 'joi';

export default joi.object({
  name: joi.string()
            .trim()
            .min(1)
            .required(),
  email: joi.string()
            .trim()
            .email()
            .required(),
  password: joi.string()
                .trim()
                .min(6)
                .required()
});