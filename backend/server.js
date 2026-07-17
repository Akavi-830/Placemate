import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authroutes.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";
import savedRouter from "./routes/saved.routes.js";
import aiRouter from "./routes/ai.routes.js";
import adminRouter from "./routes/admin.routes.js";

const PORT = 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Middleware
    app.use(express.json());

    // Request logging middleware
    app.use((req, res, next) => {
      console.log(`\n🔔 ${req.method} ${req.path}`);
      console.log("Headers:", {
        contentType: req.headers["content-type"],
        authorization: req.headers.authorization ? "✓" : "✗",
        contentLength: req.headers["content-length"],
      });
      next();
    });

    app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "http://localhost:5174",
          "http://localhost:5175",
        ],
        credentials: true,
      }),
    );
    app.use("/uploads", express.static("uploads"));

    // Routes
    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/company", companyRouter);
    app.use("/api/job", jobRouter);
    app.use("/api/application", applicationRouter);
    app.use("/api/saved", savedRouter);
    app.use("/api/ai", aiRouter);
    app.use("/api/admin", adminRouter);
    app.get("/", (req, res) => {
      res.send("api is working");
    });

    app.listen(PORT, () => {
      console.log(`✅ Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message || error);
    process.exit(1);
  }
};

startServer();
