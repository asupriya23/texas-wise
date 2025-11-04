## Texas Wise — Coders Dashboard

A small full-stack project that provides a coding contest dashboard, activity visualizations and a newsletter subscription backend. It combines a React + Vite frontend with a lightweight Node/Express backend and MongoDB for persistence. The project includes data generation utilities (mock contest/problem data), a newsletter subscription API, and Supabase integration for user/profile data.

## Table of contents
- Project summary
- Architecture & tech stack
- External services / APIs used
- Environment variables
- Local setup & run
- Build & deployment notes
- Contributing & support

## Project summary

Texas Wise is a dashboard-style app aimed at competitive programmers. It shows calendar events, rating/solved-history visualizations, and provides a newsletter subscription API. The frontend lives in `texas-frontend/` and the backend lives in `texas-backend/`.

## Architecture & tech stack

Overview:
- Frontend: React (Vite + TypeScript) app that renders charts, calendars and UI components.
- Backend: Node.js + Express server that manages newsletter subscribers and sends emails.
- Database: MongoDB (Atlas) via Mongoose for subscriber storage.
- Auth/Data layer: Supabase client used on the frontend for profiles (project includes a Supabase client file).

Detailed stacks and major libraries

- Frontend (located in `texas-frontend/`)
  - React 18 (TypeScript support)
  - Vite (dev server / build)
  - Tailwind CSS (utility CSS)
  - MUI (Material UI) for components
  - FullCalendar for calendar UI
  - Recharts and react-calendar-heatmap for charts/heatmap
  - @supabase/supabase-js for Supabase client integration
  - Utilities: axios, date-fns, dotenv (for local dev), lucide-react

- Backend (located in `texas-backend/`)
  - Node.js + Express
  - Mongoose (MongoDB ODM)
  - MongoDB native driver available via dependencies
  - Nodemailer + Handlebars for sending templated emails
  - CORS, dotenv for config

- Dev / Build
  - ESLint, TypeScript types for dev in the frontend
  - Vite for frontend dev server and production build

## External services / APIs used

- MongoDB Atlas: The backend connects to a MongoDB Atlas cluster via the `MONGODB_URI` connection string.
- Supabase: The frontend uses a Supabase client (`src/lib/supabase.ts`) to interact with your Supabase instance (URL + anon key).
- Gmail / SMTP (via Nodemailer): The backend uses Nodemailer to send emails (newsletter/templates). Current `.env` contains Gmail credentials (EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD).
- Contest data: the repository includes data-generation scripts for CodeChef / Codeforces / LeetCode (under `texas-frontend/src/lib/`) which generate mock data locally. There are no direct calls in the repo to the public contest APIs — the project uses generated/mock data files stored under `public/data/`.

Note: The repo currently contains a Supabase URL and anon key in `texas-frontend/src/lib/supabase.ts`. For security and flexibility, move these values to env vars (see Environment variables below) before deploying.

## Environment variables

Backend (`texas-backend/.env`)
- MONGODB_URI — MongoDB connection string (mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/<dbname>?retryWrites=true&w=majority)
- PORT — port to run the Express server (default: 3000)
- EMAIL_SERVICE — e.g. `gmail` (used by Nodemailer)
- EMAIL_USER — SMTP username (email address)
- EMAIL_PASSWORD — SMTP password or app-specific password

Frontend (recommended environment variables) — store in `.env` or `VITE_*` variables as required by Vite
- SUPABASE_URL or VITE_SUPABASE_URL — your Supabase project URL
- SUPABASE_ANON_KEY or VITE_SUPABASE_ANON_KEY — the anon/public key for the Supabase client

Security note: Never commit secret keys or passwords. The repo `.gitignore` includes `.env` files by default. Replace any hard-coded keys (for example, the Supabase anon key in the repo) with environment variables prior to production.

## Local setup & run

Prerequisites:
- Node.js (preferably v18+)
- npm (or yarn)

1) Backend

  - Open a terminal and install dependencies:

```bash
cd texas-backend
npm install
```

  - Create a `.env` file (copy `.env.example` if you maintain one) and populate the variables listed above.

  - Start the backend server:

```bash
# direct (the repository includes server.js)
node server.js

# or using nodemon (if you have it installed globally)
nodemon server.js
```

2) Frontend

  - Install dependencies and start the dev server:

```bash
cd texas-frontend
npm install
npm run dev
```

  - Open the address printed by Vite (usually http://localhost:5173).

3) Generating mock data

  - The frontend includes scripts under `src/lib/` for generating mock problem/contest data for various platforms. Running them will write JSON files into `public/data/` which the UI can read.

## Build & deploy notes

- Frontend: `npm run build` in the `texas-frontend/` folder creates a production build you can host on Vercel, Netlify, or any static hosting. For Vite, ensure you set production env vars on the host (Vercel/Netlify). If you use Vite env variables, prefix with `VITE_`.
- Backend: host on any Node host (Heroku, Railway, Render, DigitalOcean). Add the required environment variables on the host and configure your MongoDB Atlas IP/network rules and authentication.
- Supabase: configure your Supabase project and move the URL/anon key to environment variables.

## Troubleshooting

- ENOTFOUND errors when connecting to MongoDB usually mean the cluster host in `MONGODB_URI` is incorrect or DNS/network is blocking access. Verify the cluster host name and your Atlas network/IP allowlist.
- If you get email authentication errors, consider creating an app password (for Gmail + 2FA) and ensure the EMAIL_SERVICE/EMAIL_USER/EMAIL_PASSWORD are correct.

## Contributing

- Create issues or PRs for bug fixes or features.
- Keep secrets out of commits. Use `.env` or the hosting platform's secret manager.

## License

Add a license of your choice (MIT, Apache-2.0, etc.) by adding a `LICENSE` file.

---

If you want, I can:
- Add a `README.md` to the frontend and backend subfolders with more granular run scripts.
- Add a simple `package.json` start script in the backend (e.g., `"start": "node server.js"`).
- Replace hard-coded Supabase keys with environment variable usage in `src/lib/supabase.ts` and show how to use Vite env vars.

Tell me which of those you'd like and I'll make the changes.
