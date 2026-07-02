# Resource FOMO

**Stop Searching. Start Learning.**

A platform that solves decision paralysis in learning: instead of another list of
resources, it gives students one confidently-matched resource, with a transparent
score explaining why.

## Architecture at a glance

- **Scoring is deterministic** — `lib/scoring/engine.ts` matches user profile to
  resource metadata with zero AI involvement. This is what produces the ranking
  and the "Stop Searching Score."
- **AI only explains** — `lib/ai/explain.ts` takes an already-ranked resource and
  turns the score breakdown into plain language via Gemini. It cannot change the
  ranking.
- **Full stack in Next.js** — App Router pages + Route Handlers, no separate
  backend service. NextAuth (Google) for auth, Prisma + SQLite for storage.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the env file and fill in real values:
   ```bash
   cp .env.example .env
   ```
   - `NEXTAUTH_SECRET`: generate with `openssl rand -base64 32`
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: from
     [Google Cloud Console](https://console.cloud.google.com/apis/credentials) →
     OAuth Client ID → Web application → add
     `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
   - `GEMINI_API_KEY`: from [Google AI Studio](https://aistudio.google.com/app/apikey).

3. Set up the database and seed resources:
   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`.

## Project structure

```
app/
  (marketing)/page.tsx      Landing page
  (app)/                    Auth-gated app: onboarding, dashboard,
                             recommendations, compare, profile
  api/recommend/route.ts    Scoring engine endpoint (no AI)
  api/explain/route.ts      Gemini explanation endpoint (downstream only)
lib/
  scoring/engine.ts         Pure scoring logic — read this first
  scoring/weights.ts        Tunable weights, single source of truth
  ai/explain.ts             Gemini prompt + call
data/resources/*.json       Hand-curated resource database, per skill
prisma/schema.prisma        Data model
prisma/seed.ts              Loads data/resources/*.json into SQLite
```

## Extending the resource database

Add or edit entries in `data/resources/<skill>.json`, matching the shape in
`types/resource.ts`, then re-run `npm run seed`. Quality of recommendations is
bottlenecked by the honesty and specificity of `strengths` / `weaknesses` /
`bestFor` / `notRecommendedFor` — don't pad these with generic filler.

## Tuning recommendations

If matches feel off, adjust `lib/scoring/weights.ts` first — never patch behavior
inside `engine.ts` with special cases. The weights are the single knob.
