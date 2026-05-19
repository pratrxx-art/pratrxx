import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoutes } from "./routes/authRoutes.js";
import { linkRoutes } from "./routes/linkRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { publicRoutes } from "./routes/publicRoutes.js";
import "./config/firebase.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, max: 200 }));

app.get("/health", (_req, res) => res.json({ ok: true, db: "firebase" }));
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API on ${port}`));
