import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { login, register } from "../services/authService.js";
import { prisma } from "../index.js";

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

export async function refreshController(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Missing refresh token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.refreshToken !== token) return res.status(401).json({ message: "Invalid refresh token" });
    const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
}
