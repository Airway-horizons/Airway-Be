// server.js
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";

// import
import swaggerDocs from "./swaggerConfig.js";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";

dotenv.config();
const app = express();
// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3001", // Allows all origins. Change this to a specific origin in production
    methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'uploads' directory
app.use(express.json());
const port = process.env.PORT || 80;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle preflight requests
app.options("*", cors());

// Routes
app.use("/api/users", userRoutes); // Routes for user-related endpoints
app.use("/api/tour", tourRoutes); // Routes for tour-related endpoints
app.use("/api/bookings", bookingsRoutes); // Routes for tour-related endpoints

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
