# Shortener Pro (Firebase Edition)

This project now uses **Firebase strictly** for backend persistence.

## Stack
- Frontend: Next.js (Vercel)
- Backend: Express (Render)
- Database/Auth: Firebase Firestore + Firebase Admin/Auth

## Required environment variables
### Backend (Render)
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `WEB_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL`

## Deploy steps
1. Create Firebase project and Firestore database.
2. Create a Firebase service account and copy project ID, client email, private key.
3. Deploy backend on Render:
   - Build: `npm install && npm run build -w apps/api`
   - Start: `npm run start -w apps/api`
4. Set backend env vars listed above.
5. Deploy frontend on Vercel with root directory `apps/web`.
6. Set `NEXT_PUBLIC_API_URL` to Render backend URL.
7. Update Render `WEB_URL` to your Vercel frontend URL.

## API coverage
- Auth: register/login/refresh
- Links: create/list
- Public: resolve/go
- Dashboard summary
- Admin stats
