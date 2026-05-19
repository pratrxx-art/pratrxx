import { Request, Response } from "express";
import { db } from "../config/firebase.js";

export async function adminStats(_req: Request, res: Response) {
  const [users, links, pending] = await Promise.all([
    db.collection("users").get(),
    db.collection("links").get(),
    db.collection("withdrawals").where("status", "==", "PENDING").get()
  ]);
  res.json({ users: users.size, links: links.size, withdrawalsPending: pending.size });
}
