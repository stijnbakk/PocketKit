# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PocketKit is a **template repository** for quickly starting SvelteKit or Next.js + PocketBase projects with production-ready authentication and deployment configurations.

**Repository Purpose:**
- **`/docs`** - Public documentation website (Starlight) that serves as the project's public site
- **`/app-svelte`** - SvelteKit template/boilerplate
- **`/app-react`** - Next.js template/boilerplate
- **`/server`** - Shared PocketBase backend for both templates
- **`GET-STARTED.sh`** - Automated setup script with framework selection

**User Workflow:**
1. Clone or fork this repository
2. Run `./GET-STARTED.sh` to automatically:
   - Choose between SvelteKit or React/Next.js
   - Initialize a fresh git repository (optionally removing .git)
   - Install dependencies using pnpm/yarn/npm
   - Download PocketBase executable
   - Create initial commit
3. Run `cd app-svelte && npm run dev` or `cd app-react && npm run dev` to start coding

**IMPORTANT FOR DEVELOPMENT:**
When making changes to PocketKit, you must update BOTH:
1. **The demo apps** - Make changes in `/app-svelte`, `/app-react`, and `/server` directories
2. **The documentation** - Update corresponding docs in `/docs` to reflect changes

**Tech Stack:**
- Frontend Options:
  - SvelteKit (Svelte 5), TypeScript, Tailwind CSS 4
  - Next.js 15 (React 19), TypeScript, Tailwind CSS 4
- Backend: PocketBase (Go-based BaaS with SQLite)
- Deployment: Vercel (frontend), Fly.io (backend)
- Docs: Astro Starlight

## Common Commands

### SvelteKit (`app-svelte/` directory)

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

### Next.js (`app-react/` directory)

```bash
# Development
npm run dev       # Start both frontend (3000) and backend (8090)
npm run dev:app   # Start only Next.js dev server
npm run dev:server # Start only PocketBase backend

# Build & Deploy
npm run build     # Build for production
npm run start     # Start production server

# Type Checking
npm run lint      # Run ESLint
```

**PocketBase Admin:** Access at `http://localhost:8090/_` during development (shared by both apps).

## Project Structure

```
PocketKit/
├── app-svelte/             # SvelteKit frontend (TEMPLATE)
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
├── app-react/              # Next.js frontend (TEMPLATE)
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   │   ├── api/auth/   # API routes for auth
│   │   │   ├── auth/       # Auth pages (login, register)
│   │   │   ├── layout.tsx  # Root layout
│   │   │   └── page.tsx    # Home page
│   │   └── lib/
│   │       ├── pocketbase.ts  # PocketBase client
│   │       └── auth.ts        # Auth utilities
│   ├── middleware.ts       # Route protection
│   └── package.json
│
├── server/                 # PocketBase backend (SHARED by both apps)
│   ├── pocketbase          # PocketBase binary (auto-downloaded by GET-STARTED.sh)
│   ├── pb_data/            # Database & files (gitignored)
│   ├── pb_migrations/      # Schema migrations
│   ├── Dockerfile          # Fly.io deployment
│   └── fly.toml            # Fly.io configuration
│
├── docs/                   # Public documentation site (Starlight)
│   └── src/content/docs/   # Documentation markdown files
│
├── GET-STARTED.sh          # Quick setup script with framework choice
├── readme.md               # Main README with quickstart
└── CLAUDE.md               # This file - guidance for Claude Code
```

## Architecture

### Authentication Flow

Both apps use **cookie-based server-side authentication**:

#### SvelteKit (`app-svelte/`)

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

#### Next.js (`app-react/`)

1. **Middleware (`middleware.ts`)**: Runs on every request
   - Validates PocketBase auth from cookie
   - Refreshes token if needed
   - Protects routes by redirecting unauthenticated users

2. **PocketBase Client** (`lib/pocketbase.ts`):
   - Single shared instance for client-side operations
   - Loads auth from cookie on initialization

3. **Auth Utilities** (`lib/auth.ts`):
   - `getAuthFromCookie()`: Extracts auth from cookies
   - `setAuthCookie()`: Saves auth to HTTP-only cookie
   - `clearAuthCookie()`: Clears auth cookie
   - `getCurrentUser()`: Gets current user from PocketBase

4. **API Routes** (`app/api/auth/`):
   - `/api/auth/login`: Handles login and sets cookie
   - `/api/auth/logout`: Clears auth cookie

### Key Patterns

#### SvelteKit

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

#### Next.js

**API Routes** (login/logout):
```typescript
// app/api/auth/login/route.ts
export async function POST(request: Request) {
  const { email, password } = await request.json();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  await pb.collection('users').authWithPassword(email, password);
  const response = NextResponse.json({ success: true });
  setAuthCookie(response, pb.authStore.exportToCookie());
  return response;
}
```

**Protected Routes**:
Middleware automatically redirects unauthenticated users. Use `getCurrentUser()` in Server Components.

**Client-side Auth State**:
Use `pb.authStore.model` to access current user in Client Components.

### Cookie Security

- HTTP-only cookies (XSS protection)
- SameSite: 'lax' (CSRF protection)
- Secure flag in production
- 7-day expiration with auto-refresh

## Environment Variables

### SvelteKit

Create `app-svelte/.env`:
```bash
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090  # Local
# PUBLIC_POCKETBASE_URL=https://your-app.fly.dev  # Production
```

### Next.js

Create `app-react/.env.local`:
```bash
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090  # Local
# NEXT_PUBLIC_POCKETBASE_URL=https://your-app.fly.dev  # Production
```

## Deployment

### Frontend (Vercel)

**SvelteKit:**
- Root directory: `app-svelte`
- Framework preset: SvelteKit
- Environment variable: `PUBLIC_POCKETBASE_URL` (production Fly.io URL)

**Next.js:**
- Root directory: `app-react`
- Framework preset: Next.js
- Environment variable: `NEXT_PUBLIC_POCKETBASE_URL` (production Fly.io URL)

### Backend (Fly.io)

Same for both apps (shared backend):
```bash
cd server
flyctl volumes create pb_data --size 1
flyctl deploy
```

## Adding Features

### Custom User Fields

1. Add fields in PocketBase Admin → Collections → users
2. Update the `PbUser` type:
   - **SvelteKit:** `app-svelte/src/lib/server/pocketbase.ts`
   - **Next.js:** `app-react/src/lib/pocketbase.ts`
3. Update user mapping:
   - **SvelteKit:** `app-svelte/src/hooks.server.ts`
   - **Next.js:** `app-react/src/lib/auth.ts`

### OAuth Providers

1. Configure in PocketBase Admin → Settings → Auth providers
2. Add OAuth buttons to login page using PB SDK methods
   - **SvelteKit:** `app-svelte/src/routes/auth/login/+page.svelte`
   - **Next.js:** `app-react/src/app/auth/login/page.tsx`

### New Collections

Use `pb.collection('collection_name')` on server-side or client-side as needed. PocketBase SDK auto-generates TypeScript types.
