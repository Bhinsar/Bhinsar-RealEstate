import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import authRouter from "./modules/auth/auth.router";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the ReState API" });
});

app.use("/api/auth", authRouter);

//404 Error
app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
