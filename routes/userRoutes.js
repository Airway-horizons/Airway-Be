// routes/userRoutes.js
import express from "express";
import {
  addUsers,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers/auth/userController.js";
import { validateSchema } from "../middleware/validationMiddleware/validationMiddleware.js";
import {
  addUserSchema,
  loginSchema,
  userUpdateSchema,
} from "../controllers/auth/validation.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Route for fetching users
router.get("/", getUsers);
router.post("/signup", validateSchema(addUserSchema), addUsers);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/forget", validateSchema(loginSchema), loginUser);
router.post("/verify", validateSchema(loginSchema), loginUser);
router.post("/new-password", validateSchema(loginSchema), loginUser);
router.patch(
  "/update/:id",
  validateSchema(userUpdateSchema),
  upload.single("profilePicture"),
  updateUser
);
router.get("/:id", getUserById);

export default router;
