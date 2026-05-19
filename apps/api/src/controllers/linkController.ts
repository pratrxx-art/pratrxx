import { Response } from "express";
import { prisma } from "../index.js";
import { AuthRequest } from "../middleware/auth.js";

export async function createLink(req: AuthRequest, res: Response) {
  const { originalUrl, customAlias, expiresAt, category } = req.body;
  const shortCode = customAlias || Math.random().toString(36).slice(2, 8);
  const link = await prisma.link.create({
    data: { userId: req.user!.userId, originalUrl, customAlias, shortCode, expiresAt, category }
  });
  res.status(201).json(link);
}

export async function listMyLinks(req: AuthRequest, res: Response) {
  const links = await prisma.link.findMany({ where: { userId: req.user!.userId }, orderBy: { createdAt: "desc" } });
  res.json(links);
}
