import Joi from "joi";

const addBookingSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty field`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "string.max": `Name should have a maximum length of {#limit}`,
    "any.required": `Name is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `Email must be a valid email`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
  phone: Joi.string().pattern(/^\d+$/).optional(),
  adults: Joi.number()
    .min(0)
    .messages({
      "number.base": `Adults should be a type of 'number'`,
      "number.empty": `Adults cannot be an empty field`,
      "number.min": `Adults should have a minimum value of {#limit}`,
      "any.required": `Adults is a required field`,
    })
    .default(0),

  ladies: Joi.number()
    .min(0)
    .messages({
      "number.base": `Ladies should be a type of 'number'`,
      "number.empty": `Ladies cannot be an empty field`,
      "number.min": `Ladies should have a minimum value of {#limit}`,
      "any.required": `Ladies is a required field`,
    })
    .default(0),

  kids: Joi.number()
    .min(0)
    .optional()
    .messages({
      "number.base": `Kids should be a type of 'number'`,
      "number.empty": `Kids cannot be an empty field`,
      "number.min": `Kids should have a minimum value of {#limit}`,
      "any.required": `Kids is a required field`,
    })
    .default(0),
  destination: Joi.string().required().messages({
    "string.base": `Destination should be a type of 'text'`,
    "string.empty": `Destination cannot be an empty field`,
    "any.required": `Destination is a required field`,
  }),
  fromDate: Joi.date().required().messages({
    "date.base": `From date must be a valid date`,
    "any.required": `From date is required`,
  }),
  toDate: Joi.date().required().messages({
    "date.base": `To date must be a valid date`,
    "any.required": `To date is required`,
  }),
})
  .custom((value, helpers) => {
    if (value.adults === 0 && value.ladies === 0 && value.kids === 0) {
      return helpers.error("any.invalid", {
        message:
          "At least one of adults, ladies, or kids must have a value greater than 0",
      });
    }
    return value;
  })
  .messages({
    "any.invalid":
      "At least one of adults, ladies, or kids must be greater than 0",
  });

export default addBookingSchema;
