import { Response } from "express";
import { db } from "../config/firebase.js";
import { AuthRequest } from "../middleware/auth.js";

export async function dashboardSummary(req: AuthRequest, res: Response) {
  const userId = req.user!.userId;
  const links = await db.collection("links").where("userId", "==", userId).get();
  const withdrawals = await db.collection("withdrawals").where("userId", "==", userId).limit(5).get();
  res.json({ links: links.size, visits: 0, withdrawals: withdrawals.docs.map((d) => ({ id: d.id, ...d.data() })) });
}
