# Shortener Pro (Monetized URL Shortener)

Production-focused monorepo scaffold for a modern URL shortener and monetized link-sharing platform.

## Stack
- Next.js 15 + TypeScript + Tailwind CSS (frontend)
- Node.js + Express + Prisma (backend)
- PostgreSQL, Redis
- JWT auth (access + refresh tokens)
- Docker + Nginx ready

## Current functional scope
- User registration/login with JWT access token and refresh endpoint
- Authenticated link creation + listing on dashboard
- Public short link resolve + click tracking endpoint
- Basic admin stats and dashboard summary APIs

## Local run
1. `cp .env.example .env`
2. `npm install`
3. `npx prisma generate`
4. `npx prisma migrate dev --name init`
5. `npm run dev`

## Production deployment (recommended)
### 1) Backend deployment (Render/Railway/Fly)
- Deploy from repo root
- Build command: `npm install && npm run build -w apps/api`
- Start command: `npm run start -w apps/api`
- Environment variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_REFRESH_SECRET`
  - `WEB_URL=https://<your-vercel-domain>`
  - `REDIS_URL`

### 2) Frontend deployment (Vercel)
- Import repo in Vercel
- Root Directory: `apps/web`
- Build command: `npm run build`
- Install command: `npm install`
- Environment variable:
  - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>`

### 3) DNS
- `app.yourdomain.com` -> Vercel frontend
- `api.yourdomain.com` -> API host

## Next production hardening tasks
- Email verification + password reset workflow
- OAuth providers (Google)
- Anti-bot/captcha + fraud scoring
- Payment workflows and withdrawal approvals
- Full analytics charts and queue workers
