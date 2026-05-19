import { Request, Response } from "express";
import { prisma } from "../index.js";

export async function resolveShortCode(req: Request, res: Response) {
  const { code } = req.params;
  const link = await prisma.link.findFirst({ where: { shortCode: code, status: "ACTIVE" } });
  if (!link) return res.status(404).json({ message: "Link not found" });
  if (link.expiresAt && link.expiresAt < new Date()) return res.status(410).json({ message: "Link expired" });
  res.json({
    code,
    originalUrl: link.originalUrl,
    countdownSeconds: 5,
    requiresPassword: Boolean(link.password)
  });
}

export async function trackAndRedirect(req: Request, res: Response) {
  const { code } = req.params;
  const link = await prisma.link.findFirst({ where: { shortCode: code, status: "ACTIVE" } });
  if (!link) return res.status(404).json({ message: "Link not found" });

  const ipAddress = req.ip || "unknown";
  await prisma.visit.create({
    data: {
      linkId: link.id,
      ipAddress,
      browser: req.headers["user-agent"],
      referrer: req.headers.referer,
      isValid: true
    }
  });
  await prisma.link.update({ where: { id: link.id }, data: { clicks: { increment: 1 } } });
  res.json({ redirectTo: link.originalUrl });
}
