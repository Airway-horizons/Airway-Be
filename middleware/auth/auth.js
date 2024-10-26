import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { errorResponse } from "../../utils/responseHelper.js";

dotenv.config();

const key = process.env.SECRET_KEY;

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Extract token
  if (!token) {
    return errorResponse(res, "Access denied. No token provided.", 401);
  }
  try {
    const verified = jwt.verify(token, key);
    req.userData = verified; // Add the user ID to the request object
    next();
  } catch (error) {
    return errorResponse(res, "Invalid token", 400);
  }
};
