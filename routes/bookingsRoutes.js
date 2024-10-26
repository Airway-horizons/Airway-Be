import express from "express";
import { authenticateJWT } from "../middleware/auth/auth.js";
import addBookingSchema from "../controllers/booking/validation.js";
import {
  deleteBooking,
  getAllBooking,
  getByIdBooking,
  patchBooking,
  postBooking,
} from "../controllers/booking/bookingController.js";
import { validateSchema } from "../middleware/validationMiddleware/validationMiddleware.js";

const router = express.Router();

// Route for fetching users
router.get("/", authenticateJWT, getAllBooking);
router.post(
  "/add",
  authenticateJWT,
  validateSchema(addBookingSchema),
  postBooking
);
router.delete("/delete/:id", authenticateJWT, deleteBooking);
router.patch("/update/:id", authenticateJWT, patchBooking);
router.get("/:id", authenticateJWT, getByIdBooking);

export default router;
