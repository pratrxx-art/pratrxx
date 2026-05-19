import { Router } from "express";
import { createLink, listMyLinks } from "../controllers/linkController.js";
import { requireAuth } from "../middleware/auth.js";

export const linkRoutes = Router();
linkRoutes.post("/", requireAuth, createLink);
linkRoutes.get("/mine", requireAuth, listMyLinks);
