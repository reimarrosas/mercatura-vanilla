import joi from 'joi';

export default joi.object({
  name: joi.string()
            .trim()
            .min(1),
  email: joi.string()
            .trim()
            .email(),
  password: joi.string()
                .trim()
                .min(6)
});