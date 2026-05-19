import { Response } from "express";
import { prisma } from "../index.js";
import { AuthRequest } from "../middleware/auth.js";

export async function dashboardSummary(req: AuthRequest, res: Response) {
  const userId = req.user!.userId;
  const [links, visits, withdrawals] = await Promise.all([
    prisma.link.count({ where: { userId } }),
    prisma.visit.count({ where: { link: { userId } } }),
    prisma.withdrawal.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 })
  ]);
  res.json({ links, visits, withdrawals });
}
