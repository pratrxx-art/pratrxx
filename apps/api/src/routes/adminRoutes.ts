import { Router } from "express";
import { adminStats } from "../controllers/adminController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

export const adminRoutes = Router();
adminRoutes.get("/stats", requireAuth, requireRole(["ADMIN", "MODERATOR"]), adminStats);
