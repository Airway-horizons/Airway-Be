// routes/userRoutes.js
import express from "express";
import {
  addUsers,
  changePassword,
  forgetPassword,
  getUserById,
  getUsers,
  loginUser,
  resendOTP,
  updateUser,
  verifyOTP,
} from "../controllers/auth/userController.js";
import { validateSchema } from "../middleware/validationMiddleware/validationMiddleware.js";
import {
  addUserSchema,
  changePasswordSchema,
  ForgetSchema,
  loginSchema,
  resentSchema,
  userUpdateSchema,
  verifyOtpSchema,
} from "../controllers/auth/validation.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Route for fetching users
router.get("/", getUsers);
router.post("/signup", validateSchema(addUserSchema), addUsers);
router.post("/login", validateSchema(loginSchema), loginUser);
router.patch(
  "/update/:id",
  validateSchema(userUpdateSchema),
  upload.single("profilePicture"),
  updateUser
);
router.get("/:id", getUserById);

router.post("/forget", validateSchema(ForgetSchema), forgetPassword);
router.post("/verify-otp", validateSchema(verifyOtpSchema), verifyOTP);
router.post(
  "/change-password",
  validateSchema(changePasswordSchema),
  changePassword
);
router.post("/resent-otp", validateSchema(resentSchema), resendOTP);

export default router;
