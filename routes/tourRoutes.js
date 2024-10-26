// routes/userRoutes.js
import express from "express";
// import
import addTourSchema from "../controllers/tour/validation.js";
import {
  deleteTour,
  getTour,
  postTour,
  patchTour,
  getByIdTour,
} from "../controllers/tour/tourController.js";
import { authenticateJWT } from "../middleware/auth/auth.js";
import { validateSchema } from "../middleware/validationMiddleware/validationMiddleware.js";

const router = express.Router();

// Route for fetching users
router.get("/", getTour);
router.post("/add", validateSchema(addTourSchema), postTour);
router.delete("/delete/:id", deleteTour);
router.patch("/update/:id", patchTour);
router.get("/:id", authenticateJWT, getByIdTour);

export default router;
