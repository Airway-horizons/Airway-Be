export const validateSchema = (schema) => {
  return async (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.details[0].message,
      });
    }
    req.validatedBody = value; // Attach validated data to req
    next(); // Pass control to the next middleware/controller
  };
};
