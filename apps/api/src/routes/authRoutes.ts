import { Router } from "express";
import { loginController, refreshController, registerController } from "../controllers/authController.js";

export const authRoutes = Router();
authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/refresh", refreshController);
