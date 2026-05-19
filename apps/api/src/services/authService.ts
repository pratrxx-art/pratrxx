import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

export async function register(name: string, email: string, password: string) {
  const hash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, passwordHash: hash, referralCode: randomUUID().slice(0, 8) }
  });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });
  return { accessToken, refreshToken, user };
}
