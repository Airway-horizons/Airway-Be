import Joi from "joi";

const addBookingSchema = Joi.object({
  // 1. Customer Information
  customerId: Joi.string().required().messages({
    "string.base": "Customer ID should be a type of 'text'",
    "any.required": "Customer ID is a required field",
  }),
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of 'text'",
    "string.empty": "Name cannot be an empty field",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is a required field",
  }),
  phone: Joi.string().pattern(/^\d+$/).required().messages({
    "string.pattern.base": "Contact number should contain only digits",
    "any.required": "Contact number is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be an empty field",
    "any.required": "Email is a required field",
  }),
  // 2. Tour Package Details
  packageId: Joi.string().required().messages({
    "any.required": "Package ID is a required field",
  }),
  fromDate: Joi.date().required().messages({
    "any.required": "Start date is a required field",
  }),
  toDate: Joi.date().required().greater(Joi.ref("startDate")).messages({
    "any.required": "End date is a required field",
    "date.greater": "End date must be after start date",
  }),
  specialRequests: Joi.string().optional(),
  // 5. Itinerary (Optional)
  itinerary: Joi.array()
    .items(
      Joi.object({
        day: Joi.number().positive().integer().required().messages({
          "number.base": "Day should be a positive integer",
          "any.required": "Day is a required field",
        }),
        description: Joi.string().required().messages({
          "any.required": "Description is a required field",
        }),
        activityType: Joi.string().required().messages({
          "any.required": "Activity type is a required field",
        }),
        location: Joi.string().required().messages({
          "any.required": "Location is a required field",
        }),
      })
    )
    .optional(),
})
  .custom((value, helpers) => {
    // Ensure that at least one of `adults`, `ladies`, or `kids` is greater than 0
    if (
      (value.adults ?? 0) === 0 &&
      (value.ladies ?? 0) === 0 &&
      (value.kids ?? 0) === 0
    ) {
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
