# Your Portfolio — Single-Owner CMS Website

A showcase portfolio site with a private dashboard. Only you (the single owner) can log
in and edit content; every visitor to the public site always sees the latest saved
version — no rebuild or redeploy needed when you update content or images.

**Stack (100% free tier):**
- Frontend: React + Vite + Tailwind CSS + Framer Motion (animations) → deployed as a Render Static Site
- Backend: Node.js + Express + JWT auth → deployed as a Render Web Service (free)
- Database: MongoDB Atlas (free M0 cluster) — stores all your content as one document
- Images: Cloudinary (free tier) — the dashboard uploads images here, not to Render's disk (Render's free disk is wiped on redeploy, so images must live somewhere persistent)

## How "instant reflect" works
There's only **one** content document in the database. The dashboard edits it; the
public site fetches it fresh (`Cache-Control: no-store`) every time someone loads the
page. So the moment you hit Save in the dashboard, the next page load/refresh — by
you or anyone else, anywhere — shows the change. No polling or websockets needed.

## Sections included
Hero · About · Education (toggle visible/hidden) · Work Experience (toggle) ·
Certifications (click a card → full-size certificate image opens) ·
Projects (click a card → popup with details on the left, images on the right) ·
Chronicles (events attended, alternating timeline) · Contact (message form that
saves to your dashboard inbox + optional email notification).

Certifications appear before Projects, as you asked. Education/Experience/
Certifications/Projects/Chronicles can each be hidden from the dashboard with one
toggle — hidden sections also disappear from the nav bar automatically.

---

## 1. Local setup

### Prerequisites (all free)
1. **MongoDB Atlas** — https://www.mongodb.com/cloud/atlas/register → create a free M0
   cluster → Database Access: create a user/password → Network Access: allow
   `0.0.0.0/0` (or Render's IPs) → get your connection string.
2. **Cloudinary** — https://cloudinary.com/users/register/free → after signup, your
   dashboard shows Cloud Name, API Key, API Secret.
3. **Node.js 18+** installed locally.
4. *(Optional, for contact-form email alerts)* A Gmail account → turn on 2FA →
   generate an "App Password" at https://myaccount.google.com/apppasswords

### Backend
```bash
cd server
cp .env.example .env
# edit .env: paste your MONGO_URI, a random JWT_SECRET, your ADMIN_EMAIL/ADMIN_PASSWORD,
# and your Cloudinary keys
npm install
npm run seed      # creates your single owner account + initial content document
npm run dev        # starts on http://localhost:5000
```

### Frontend
```bash
cd client
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev             # starts on http://localhost:5173
```

Visit `http://localhost:5173` for the public site and
`http://localhost:5173/dashboard/login` to log in with the ADMIN_EMAIL/ADMIN_PASSWORD
you set in `.env`.

---

## 2. Deploy for free on Render

You'll deploy **two** Render services from this same repo: the backend (Web Service)
and the frontend (Static Site). Push this project to a GitHub repo first.

### Option A — One click with the included blueprint
This repo includes `render.yaml`. In the Render dashboard: **New +** → **Blueprint** →
connect your GitHub repo → Render detects `render.yaml` and creates both services →
fill in the environment variables it asks for (Mongo URI, Cloudinary keys, etc.) → Apply.

### Option B — Manual setup
**Backend (Web Service):**
1. Render dashboard → New + → Web Service → connect your repo.
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Plan: Free
6. Add environment variables (same names as `server/.env.example`):
   `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`,
   `CLIENT_URL` (fill this in after step below), and optionally `SMTP_USER`,
   `SMTP_PASS`, `NOTIFY_EMAIL`.
7. Deploy. Note the URL Render gives you, e.g. `https://portfolio-backend.onrender.com`.
8. Open the service's **Shell** tab (or run once locally against the Atlas URI) and run:
   `npm run seed` — this creates your one owner login. You only do this once.

**Frontend (Static Site):**
1. Render dashboard → New + → Static Site → same repo.
2. Root Directory: `client`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Environment variable: `VITE_API_URL` = `https://portfolio-backend.onrender.com/api`
   (your backend URL from above, with `/api` appended).
6. Add a rewrite rule so client-side routing works: Source `/*` → Destination
   `/index.html` (Rewrite).
7. Deploy. This gives you your live site URL, e.g. `https://your-name.onrender.com`.

**Final step:** go back to the backend service's env vars and set `CLIENT_URL` to your
frontend's URL (needed for CORS), then trigger a redeploy of the backend.

### Free-tier note
Render's free web services spin down after 15 minutes of inactivity and take
~30-50 seconds to wake up on the next request. That's normal and costs nothing — the
first visitor after idle time just waits a bit longer for the API to respond. The
static frontend has no such delay.

---

## 3. Using the dashboard
Go to `https://your-site.com/dashboard/login`, sign in with your ADMIN_EMAIL /
ADMIN_PASSWORD. From there:
- **Hero / About / Contact** — edit text and upload the section's image directly.
- **Education / Experience / Certifications / Projects / Chronicles** — each has a
  "Visible on site / Hidden from site" toggle at the top, plus Add/Edit/Delete for
  individual entries (with image upload where relevant).
- **Messages** — see everything submitted through the public Contact form.

Every Save updates the single content document immediately — refresh the public site
in any browser, on any device, and it's already there.

## Project structure
```
portfolio-app/
├── render.yaml           # one-click Render Blueprint for both services
├── server/                # Express API
│   ├── models/            # User, SiteContent (single doc), Message
│   ├── routes/             # auth, content, items, upload, messages
│   ├── middleware/auth.js  # JWT guard for dashboard-only routes
│   └── seedAdmin.js        # creates the one owner account
└── client/                 # React + Vite + Tailwind + Framer Motion
    ├── src/components/     # public site sections (Hero, About, Projects, ...)
    ├── src/dashboard/      # owner-only editing UI
    └── src/context/        # auth + content fetching
```
