import { Request, Response } from "express";
import { db } from "../config/firebase.js";

export async function resolveShortCode(req: Request, res: Response) {
  const snap = await db.collection("links").where("shortCode", "==", req.params.code).where("status", "==", "ACTIVE").limit(1).get();
  if (snap.empty) return res.status(404).json({ message: "Link not found" });
  const link = snap.docs[0].data();
  res.json({ code: req.params.code, originalUrl: link.originalUrl, countdownSeconds: 5 });
}

export async function trackAndRedirect(req: Request, res: Response) {
  const snap = await db.collection("links").where("shortCode", "==", req.params.code).where("status", "==", "ACTIVE").limit(1).get();
  if (snap.empty) return res.status(404).json({ message: "Link not found" });
  const linkDoc = snap.docs[0];
  const link = linkDoc.data();
  await db.collection("visits").add({ linkId: linkDoc.id, ipAddress: req.ip || "unknown", referrer: req.headers.referer || null, createdAt: new Date().toISOString(), isValid: true });
  await linkDoc.ref.update({ clicks: (link.clicks || 0) + 1 });
  res.json({ redirectTo: link.originalUrl });
}
