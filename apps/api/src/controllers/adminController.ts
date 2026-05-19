import { Request, Response } from "express";
import { prisma } from "../index.js";

export async function adminStats(_req: Request, res: Response) {
  const [users, links, withdrawalsPending] = await Promise.all([
    prisma.user.count(),
    prisma.link.count(),
    prisma.withdrawal.count({ where: { status: "PENDING" } })
  ]);
  res.json({ users, links, withdrawalsPending });
}
