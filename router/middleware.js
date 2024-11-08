const Joi = require("joi");
const validateData = (req, res, next) => {
  const schema = Joi.object({
    from: Joi.string().max(10).required().messages({
      "string.empty": "'from' field cannot be empty",
      "string.max": "'from' field cannot exceed 10 characters",
      "any.required": "'from' field is required",
    }),
    to: Joi.string().max(10).required().messages({
      "string.empty": "'to' field cannot be empty",
      "string.max": "'to' field cannot exceed 10 characters",
      "any.required": "'to' field is required",
    }),
    period: Joi.string()
      .valid("1D", "1W", "1M", "3M", "6M", "1Y")
      .required()
      .messages({
        "any.only": "'period' field must be one of [1W, 1M, 3M, 6M, 1Y]",
        "any.required": "'period' field is required",
      }),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

module.exports = { validateData };
