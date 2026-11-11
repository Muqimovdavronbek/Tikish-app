# TIKISH.UZ

**A marketplace interface connecting customers with tailors in Uzbekistan.**

## Features

- Tailor discovery and profile screens.
- Portfolio and service previews.
- Customer and tailor registration flows.
- Onboarding and personal dashboard.
- Messaging and AI styling assistant interfaces.

**Status:** application prototype. Demo state uses browser storage. Production payments, protected transactions, realtime chat and database authentication need separate integration and verification.

## Quick start

Install Node.js and pnpm. Package versions are recorded in `package.json` and `pnpm-lock.yaml`.

```bash
git clone https://github.com/Muqimovdavronbek/Tikish-app.git
cd Tikish-app
pnpm install --frozen-lockfile
pnpm run dev
```

Open `http://localhost:3000` or the address shown in the terminal.

## Usage

Browse tailors on the home page, open a profile, choose a customer or tailor role during registration and complete onboarding to explore the dashboard.

| Route | Purpose |
| --- | --- |
| `/` | Marketplace |
| `/tailor/[id]` | Tailor profile |
| `/auth/login`, `/auth/signup` | Account screens |
| `/onboarding` | Profile setup |
| `/dashboard` | Personal dashboard |
| `/messages` | Messaging interface |
| `/stylist` | Styling assistant |

## Integrations

`scripts/01-create-schema.sql` contains a database schema; its presence does not connect the application to a live database.

`app/api/stylist/route.ts` uses AI SDK with `openai/gpt-4o-mini`. The server needs valid service access and quota. Keep credentials in server-side configuration. Demo accounts are not a substitute for production authentication.

## Development

```bash
pnpm run build
pnpm run start
```

Pages and server routes live in `app/`, reusable UI in `components/`, assets in `public/`, and helper code in `lib/`.

For contributions, describe the affected flow and clearly identify connected integrations versus demo behavior.
