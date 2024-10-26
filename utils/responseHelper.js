export const successResponse = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};

export const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    statusCode,
    message,
  });
};
