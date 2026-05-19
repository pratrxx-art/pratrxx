# Shortener Pro (Monetized URL Shortener)

Production-focused monorepo scaffold for a modern URL shortener and monetized link-sharing platform.

## Stack
- Next.js 15 + TypeScript + Tailwind CSS (frontend)
- Node.js + Express + Prisma (backend)
- PostgreSQL, Redis
- JWT auth (access + refresh tokens)
- Docker + Nginx ready

## Features Included
- Auth routes (register/login), role middleware, protected APIs
- Link creation/listing APIs and dashboard summaries
- Admin stats endpoint
- Prisma schema with users/links/visits/withdrawals/ads/settings/api tokens
- Landing page and dashboard/admin route shells
- Docker compose with Postgres + Redis + app

## Run locally
1. `cp .env.example .env`
2. `npm install`
3. `npx prisma generate`
4. `npx prisma migrate dev --name init`
5. `npm run dev`

## API Docs
Swagger wiring can be added at `/api/docs` using `swagger-ui-express`; recommended next step is adding OpenAPI YAML under `docs/openapi.yaml`.

## Production checklist
- Add real email provider + verification workflows
- Add Google OAuth
- Implement captcha + safe browsing checks
- Build withdrawal processors (PayPal/Payoneer/Crypto/UPI/Bank)
- Add anti-fraud jobs and Redis queues
- Add full page set (blog/faq/contact/terms/privacy)
