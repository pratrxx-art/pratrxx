import { Response } from "express";
import { db } from "../config/firebase.js";
import { AuthRequest } from "../middleware/auth.js";

export async function createLink(req: AuthRequest, res: Response) {
  const { originalUrl, customAlias, expiresAt, category } = req.body;
  const shortCode = customAlias || Math.random().toString(36).slice(2, 8);
  const ref = db.collection("links").doc();
  await ref.set({ userId: req.user!.userId, originalUrl, customAlias: customAlias || null, shortCode, expiresAt: expiresAt || null, category: category || null, clicks: 0, status: "ACTIVE", createdAt: new Date().toISOString() });
  res.status(201).json({ id: ref.id, shortCode, originalUrl });
}

export async function listMyLinks(req: AuthRequest, res: Response) {
  const snap = await db.collection("links").where("userId", "==", req.user!.userId).get();
  res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}
