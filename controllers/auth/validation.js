import Joi from "joi";

export const addUserSchema = Joi.object({
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
  password: Joi.string().min(8).required().messages({
    "string.min": `Password should have a minimum length of {#limit}`,
    "string.empty": `Password cannot be an empty field`,
    "any.required": `Password is a required field`,
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Email must be a valid email`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": `Password should have a minimum length of {#limit}`,
    "string.empty": `Password cannot be an empty field`,
    "any.required": `Password is a required field`,
  }),
});

// Joi validation schema
export const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().pattern(/^\d+$/).optional(),
  state: Joi.string().optional(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
  zipcode: Joi.string().optional(),
});

export const ForgetSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Email must be a valid email`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
});

export const verifyOtpSchema = Joi.object({
  otp: Joi.string().min(6).max(6).required().messages({
    "string.base": `OTP should be a type of 'text'`,
    "string.empty": `OTP cannot be an empty field`,
    "string.min": `OTP should have a minimum length of {#limit}`,
    "string.max": `OTP should have a maximum length of {#limit}`,
    "any.required": `OTP is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `Email must be a valid email`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
});

export const changePasswordSchema = Joi.object({
  otp: Joi.string().min(6).max(6).required().messages({
    "string.base": `OTP should be a type of 'text'`,
    "string.empty": `OTP cannot be an empty field`,
    "string.min": `OTP should have a minimum length of {#limit}`,
    "string.max": `OTP should have a maximum length of {#limit}`,
    "any.required": `OTP is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `Email must be a valid email`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": `Password should have a minimum length of {#limit}`,
    "string.empty": `Password cannot be an empty field`,
    "any.required": `Password is a required field`,
  }),
});

export const resentSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Email must be a valid email`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
});
