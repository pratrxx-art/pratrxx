import { Request, Response } from "express";
import { login, register } from "../services/authService.js";

export async function registerController(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const user = await register(name, email, password);
  res.status(201).json({ userId: user.id, message: "Registered" });
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  const payload = await login(email, password);
  if (!payload) return res.status(401).json({ message: "Invalid credentials" });
  res.cookie("refreshToken", payload.refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
  res.json({ accessToken: payload.accessToken, user: payload.user });
}
