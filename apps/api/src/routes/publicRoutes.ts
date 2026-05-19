import { Router } from "express";
import { resolveShortCode, trackAndRedirect } from "../controllers/publicController.js";

export const publicRoutes = Router();
publicRoutes.get("/resolve/:code", resolveShortCode);
publicRoutes.post("/go/:code", trackAndRedirect);
