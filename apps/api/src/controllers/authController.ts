import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../config/firebase.js";

function sanitizeUser(user: Record<string, unknown>) {
  const { password, refreshToken, ...safe } = user;
  return safe;
}

export async function registerController(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "name, email, password are required" });

  const existing = await db.collection("users").where("email", "==", String(email).toLowerCase()).limit(1).get();
  if (!existing.empty) return res.status(409).json({ message: "Email already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const ref = db.collection("users").doc();
  await ref.set({
    name,
    email: String(email).toLowerCase(),
    passwordHash,
    role: "USER",
    balance: 0,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({ userId: ref.id, message: "Registered" });
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password are required" });

  const snap = await db.collection("users").where("email", "==", String(email).toLowerCase()).limit(1).get();
  if (snap.empty) return res.status(401).json({ message: "Invalid credentials" });

  const userDoc = snap.docs[0];
  const user = userDoc.data();
  const ok = await bcrypt.compare(password, user.passwordHash || "");
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = jwt.sign({ userId: userDoc.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: userDoc.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
  await userDoc.ref.update({ refreshToken, lastLoginAt: new Date().toISOString() });

  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
  res.json({ accessToken, user: { id: userDoc.id, ...sanitizeUser(user) } });
}

export async function refreshController(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Missing refresh token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };
    const doc = await db.collection("users").doc(decoded.userId).get();
    if (!doc.exists || doc.data()?.refreshToken !== token) return res.status(401).json({ message: "Invalid refresh token" });
    const accessToken = jwt.sign({ userId: doc.id, role: doc.data()!.role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
}
