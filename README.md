# GILPIX — Wedding Photography & Films

A React + Node application. **The backend is deliberately static for this draft**: it serves
structured content from plain JS modules and validates enquiries, but has no database, auth,
CMS, email or payments.

```
gilpix/
├─ client/                 React 18 · Vite · Tailwind CSS · React Router
│  └─ src/
│     ├─ pages/            Home · Stories · Story · Services · About · Contact · NotFound
│     ├─ components/       Layout, Nav, Hero, Photo, Reveal, StoryCard, CTABand, …
│     ├─ hooks/            useApi (fetch + cache), useInView (reveals), usePageTitle
│     ├─ lib/              api.js (fetch wrapper) · photo.js (placeholder engine) · config.js
│     └─ styles/site.css   Design tokens, type scale, editorial layouts, motion
└─ server/                 Node 18+ · Express
   ├─ src/
   │  ├─ data/             ← ALL content lives here (stories, services, testimonials, pages, site)
   │  ├─ routes/           content.js (GET) · enquiries.js (POST)
   │  ├─ lib/              validateEnquiry.js · rateLimit.js
   │  └─ app.js · index.js
   └─ test/api.test.js     10 tests (node:test, no extra deps)
```

## Run it

```bash
npm install            # installs client + server (npm workspaces)
npm run dev            # API on :4000, site on http://localhost:5173 (Vite proxies /api)
```

Production-style (one process serves the API **and** the built site):

```bash
npm run build          # builds client/dist
npm start              # http://localhost:4000
```

```bash
npm test               # API tests
```

Copy `server/.env.example` → `server/.env` to change `PORT` / `CORS_ORIGIN`.
Set `CLIENT_DIST=/path/to/build` to serve a build from elsewhere. If the client is hosted
separately from the API, set `VITE_API_URL=https://api.example.com/api` at build time.

## Routes

| Page | URL | API call |
|---|---|---|
| Home | `/` | `GET /api/home` |
| Stories | `/stories` | `GET /api/stories` |
| Story | `/stories/:slug` e.g. `/stories/aarav-riya` | `GET /api/stories/:slug` |
| Services | `/services` | `GET /api/services` |
| About | `/about` | `GET /api/about` |
| Contact | `/contact` | `GET /api/enquiries/options`, `POST /api/enquiries` |
| (shared) | nav, footer, CTA | `GET /api/site` |

Also: `GET /api/health`, `GET /api/testimonials`.

### `POST /api/enquiries`
Validates the body (names, email, phone, future wedding date, location, ≥1 known service,
optional budget/guests/events/message), applies a honeypot and a simple in-memory rate limit
(8 per 10 min per IP), and returns `201 { ok, reference, message, stored:false }` or
`422 { errors: { field: "message" } }`. **Nothing is stored or sent.** The spot to add a
database write or email is marked `FUTURE` in `server/src/routes/enquiries.js`.

## Replacing placeholder photography

Every photograph is a *photo spec* in `server/src/data/*.js`:

```js
{ seed: 11, pal: 'vermilion', kind: 'couple', r: '4/3', label: 'Cover · couple portrait' }
```

Add a `src` and the real image replaces the generated placeholder everywhere it's used —
aspect ratio stays reserved, so there's no layout shift:

```js
{ ...same, src: '/photos/aarav-riya/cover.jpg' }   // put files in client/public/photos/
```

For a real story, replace the generated chapter photos in `buildChapters()` (`stories.js`) with
an explicit `photos: [{ src, r }, …]` per chapter. Layouts (`duo`, `wide-two`, `offset`,
`bleed`, `trio`, `quad`) are chosen per chapter and live in the same file.

## Moving to a real CMS later

The client only knows the JSON shapes above. To adopt a CMS (Sanity, Strapi, Contentful…),
keep the same response shapes and swap the imports in `server/src/routes/content.js` for CMS
queries — no client change needed. Enquiries would graduate to a DB table + email notification.

## Placeholders to replace before launch
Phone / WhatsApp (`+91 XXXXX XXXXX`), testimonials, team profiles, price figures, the featured
film (see `FilmStage.jsx` for where to drop a Vimeo/YouTube embed), and all photography.

## Deploying to Vercel (API + site in one project)

The repo root contains `vercel.json` and `api/index.js`, which run the Express API as a Vercel
function next to the built client. In Vercel → Project Settings → General:

- **Root Directory:** leave **empty** (repo root) — *not* `client`
- **Framework Preset:** Other (build/output come from `vercel.json`)
- Do **not** set `VITE_API_URL`; the client calls `/api` on the same domain.

After deploy, open `/api/health` — it should return JSON. If it shows a web page or 404, the
Root Directory is still `client`.

Limits of the serverless setup: the enquiry rate limiter is per-instance memory, and nothing is
stored (as intended for this draft).
