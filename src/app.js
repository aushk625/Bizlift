import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import businessRoutes from "./routes/business.routes.js";
import businessContentRoutes from "./routes/businessContent.routes.js";
import websiteRoutes from "./routes/website.routes.js";
import authRoutes from "./routes/auth.routes.js";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/business", businessRoutes);
app.use("/api/business-content", businessContentRoutes);
app.use("/api/websites", websiteRoutes);
app.get("/", (req, res) => {
  res.send("Backend running");
});

export default app;
