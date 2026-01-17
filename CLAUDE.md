# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PocketKit is a **template repository** for quickly starting SvelteKit + PocketBase projects with production-ready authentication and deployment configurations.

**Repository Purpose:**
- **`/docs`** - Public documentation website (Starlight) that serves as the project's public site
- **`/app` + `/server`** - The actual template/boilerplate that users clone to start their projects
- **`GET-STARTED.sh`** - Automated setup script for quick project initialization

**User Workflow:**
1. Clone or fork this repository
2. Run `./GET-STARTED.sh` to automatically:
   - Initialize a fresh git repository (optionally removing .git)
   - Install dependencies using pnpm/yarn/npm
   - Download PocketBase executable
   - Create initial commit
3. Run `cd app && npm run dev` (or yarn/pnpm) to start coding

**IMPORTANT FOR DEVELOPMENT:**
When making changes to PocketKit, you must update BOTH:
1. **The demo app** - Make changes in `/app` and `/server` directories
2. **The documentation** - Update corresponding docs in `/docs` to reflect changes

**Tech Stack:**
- Frontend: SvelteKit (Svelte 5), TypeScript, Tailwind CSS 4
- Backend: PocketBase (Go-based BaaS with SQLite)
- Deployment: Vercel (frontend), Fly.io (backend)
- Docs: Astro Starlight

## Common Commands

All commands run from the `app/` directory:

```bash
# Development
yarn dev          # Start both frontend (5173) and backend (8090)
yarn dev:app      # Start only SvelteKit dev server
yarn dev:server   # Start only PocketBase backend

# Build & Deploy
yarn build        # Build for production
yarn preview      # Preview production build

# Type Checking
yarn check        # Run svelte-check
yarn check:watch  # Run svelte-check in watch mode
```

**PocketBase Admin:** Access at `http://localhost:8090/_` during development.

## Project Structure

```
PocketKit/
├── app/                    # SvelteKit frontend (TEMPLATE)
│   ├── src/
│   │   ├── routes/         # File-based routing
│   │   │   ├── auth/       # Auth pages (login, register)
│   │   │   ├── +layout.server.ts   # Root layout loads user
│   │   │   └── +page.svelte
│   │   ├── lib/
│   │   │   ├── pocketbase.ts           # Client-side PB instance
│   │   │   └── server/pocketbase.ts    # Server-side PB helpers
│   │   ├── hooks.server.ts             # Auth validation hook
│   │   └── app.d.ts                    # Type definitions
│   └── package.json
│
├── server/                 # PocketBase backend (TEMPLATE)
│   ├── pocketbase          # PocketBase binary (auto-downloaded by GET-STARTED.sh)
│   ├── pb_data/            # Database & files (gitignored)
│   ├── pb_migrations/      # Schema migrations
│   ├── Dockerfile          # Fly.io deployment
│   └── fly.toml            # Fly.io configuration
│
├── docs/                   # Public documentation site (Starlight)
│   └── src/content/docs/   # Documentation markdown files
│
├── GET-STARTED.sh          # Quick setup script for new users
├── readme.md               # Main README with quickstart
└── CLAUDE.md               # This file - guidance for Claude Code
```

## Architecture

### Authentication Flow

PocketKit uses **cookie-based server-side authentication**:

1. **Server Hook (`hooks.server.ts`)**: Runs on every request
   - Creates PocketBase instance with auth from cookie
   - Validates auth and refreshes token if needed
   - Sets `event.locals.pbUser` (available in all server code)
   - Saves/clears auth cookie based on validation

2. **PocketBase Instances**:
   - **Client-side** (`lib/pocketbase.ts`): Single shared instance with Svelte store
   - **Server-side** (`lib/server/pocketbase.ts`): New instance per request to avoid auth conflicts

3. **Auth Utilities** (`lib/server/pocketbase.ts`):
   - `createServerPb()`: New PB instance
   - `createServerPbWithAuth(event)`: PB instance with auth from cookies
   - `validatePbAuth(pb)`: Validates and refreshes auth
   - `savePbAuthCookie(event, pb)`: Saves auth to HTTP-only cookie
   - `clearPbAuthCookie(event)`: Clears auth cookie

4. **Type Safety**:
   - `PbUser` type in `lib/server/pocketbase.ts` defines user shape
   - `App.Locals` interface in `app.d.ts` typed with `pbUser`

### Key Patterns

**Server Actions** (login/register):
```typescript
export const actions = {
  default: async ({ request, cookies }) => {
    const pb = createServerPb();
    await pb.collection('users').authWithPassword(email, password);
    savePbAuthCookie({ cookies } as any, pb);
    throw redirect(303, '/');
  }
};
```

**Protected Routes**:
Access `locals.pbUser` in `+page.server.ts` or `+layout.server.ts`. If null, user is not authenticated.

**Client-side Auth State**:
Import `currentUser` store from `lib/pocketbase.ts` for reactive auth state in components.

### Cookie Security

- HTTP-only cookies (XSS protection)
- SameSite: 'lax' (CSRF protection)
- Secure flag in production
- 7-day expiration with auto-refresh

## Environment Variables

Create `app/.env`:
```bash
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090  # Local
# PUBLIC_POCKETBASE_URL=https://your-app.fly.dev  # Production
```

## Deployment

**Frontend (Vercel):**
- Root directory: `app`
- Framework preset: SvelteKit
- Environment variable: `PUBLIC_POCKETBASE_URL` (production Fly.io URL)

**Backend (Fly.io):**
```bash
cd server
flyctl volumes create pb_data --size 1
flyctl deploy
```

## Adding Features

**Custom User Fields:**
1. Add fields in PocketBase Admin → Collections → users
2. Update `PbUser` type in `lib/server/pocketbase.ts`
3. Update user mapping in `hooks.server.ts`

**OAuth Providers:**
1. Configure in PocketBase Admin → Settings → Auth providers
2. Add OAuth buttons to login page using PB SDK methods

**New Collections:**
Use `pb.collection('collection_name')` on server-side or client-side as needed. PocketBase SDK auto-generates TypeScript types.
