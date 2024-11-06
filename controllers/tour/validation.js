import Joi from "joi";

const addTourSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty field`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "string.max": `Name should have a maximum length of {#limit}`,
    "any.required": `Name is a required field`,
  }),

  content: Joi.string().min(10).required().messages({
    "string.base": `Content should be a type of 'text'`,
    "string.empty": `Content cannot be an empty field`,
    "string.min": `Content should have a minimum length of {#limit}`,
    "any.required": `Content is a required field`,
  }),

  images: Joi.array().items(Joi.string().uri()).min(1).required().messages({
    "array.base": `Images should be an array`,
    "array.empty": `Images cannot be an empty array`,
    "array.min": `At least one image is required`,
    "any.required": `Images are required`,
  }),

  duration: Joi.string().required().messages({
    "string.base": `Duration should be a type of 'text'`,
    "string.empty": `Duration cannot be an empty field`,
    "any.required": `Duration is a required field`,
  }),

  destination: Joi.string().required().messages({
    "string.base": `Destination should be a type of 'text'`,
    "string.empty": `Destination cannot be an empty field`,
    "any.required": `Destination is a required field`,
  }),

  services: Joi.array().items(Joi.string().min(3)).min(1).required().messages({
    "array.base": `Services should be an array`,
    "array.empty": `Services cannot be an empty array`,
    "array.min": `At least one service is required`,
    "any.required": `Services are required`,
  }),

  tags: Joi.array().items(Joi.string().min(1)).required().messages({
    "array.base": `Tags should be an array`,
    "any.required": `Tags are required`,
  }),
});

export default addTourSchema;
