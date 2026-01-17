# PocketKit React App

A production-ready Next.js + PocketBase boilerplate with authentication and TailwindCSS.

## Features

- ✅ **Next.js 15** with App Router
- ✅ **PocketBase Authentication** - Login and register pages with cookie-based auth
- ✅ **TailwindCSS 4** - Modern styling with forms and typography plugins
- ✅ **TypeScript** - Full type safety
- ✅ **Middleware Protection** - Automatic route protection
- ✅ **Server Components** - Optimal performance with React Server Components

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- PocketBase server running (see parent `/server` directory)

### Installation

```bash
# Install dependencies
npm install  # or: yarn / pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev  # or: yarn dev / pnpm dev
```

### Starting the Full Stack

```bash
# Option 1: Start both frontend and backend together
npm run dev

# Option 2: Start separately
# Terminal 1: Start PocketBase
npm run dev:server

# Terminal 2: Start Next.js
npm run dev:app
```

**Access your app:**
- Frontend: `http://localhost:5173`
- Backend Admin: `http://localhost:8090/_`

## Environment Variables

Create a `.env.local` file in the root of the `react-app` directory:

```bash
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090  # Local development
# NEXT_PUBLIC_POCKETBASE_URL=https://your-app.fly.dev  # Production
```

## Project Structure

```
react-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/           # API routes for authentication
│   │   ├── auth/
│   │   │   ├── login/          # Login page
│   │   │   └── register/       # Registration page
│   │   ├── components/         # React components
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (protected)
│   │   └── globals.css         # Global styles
│   ├── lib/
│   │   ├── pocketbase.ts       # PocketBase client
│   │   └── auth.ts             # Auth utilities
│   └── middleware.ts           # Route protection middleware
├── .env.local                  # Environment variables (not in git)
├── .env.example                # Environment template
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # TailwindCSS configuration
└── package.json
```

## Authentication Flow

This app uses **cookie-based server-side authentication**:

1. **Client-side Authentication**: User logs in via `/auth/login` using PocketBase SDK
2. **Cookie Storage**: Auth token is saved to HTTP-only cookie via API route
3. **Middleware Protection**: `middleware.ts` validates auth on every request
4. **Server Components**: Protected pages use `getCurrentUser()` to access user data

### Key Features

- HTTP-only cookies (XSS protection)
- Automatic token refresh
- Server-side validation on every request
- CSRF protection with SameSite cookies
- Redirect to login for unauthenticated users

## Available Scripts

```bash
npm run dev          # Start both frontend (port 5173) and backend (port 8090)
npm run dev:app      # Start only Next.js dev server
npm run dev:server   # Start only PocketBase backend
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set root directory to `react-app`
4. Add environment variable: `NEXT_PUBLIC_POCKETBASE_URL=https://your-app.fly.dev`
5. Deploy

### Backend (Fly.io)

Use the PocketBase server in the parent `/server` directory. See the main README for deployment instructions.

## Customization

### Add Custom User Fields

1. Add fields in PocketBase Admin → Collections → users
2. Update the `PbUser` type in `src/lib/pocketbase.ts`
3. Update the user display in `src/app/page.tsx`

### Add OAuth Providers

1. Configure in PocketBase Admin → Settings → Auth providers
2. Update login/register pages with OAuth buttons using PocketBase SDK methods

### Styling

This template uses TailwindCSS 4. Customize your theme in `tailwind.config.ts` and add global styles in `src/app/globals.css`.

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[PocketBase](https://pocketbase.io/)** - Backend-as-a-service
- **[@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)** - Form styling
- **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)** - Typography plugin

## Common Issues

### PocketBase not connecting

Make sure:
1. PocketBase is running at `http://127.0.0.1:8090`
2. Your `.env.local` has the correct `NEXT_PUBLIC_POCKETBASE_URL`
3. PocketBase Admin account is created at `http://localhost:8090/_`

### Port already in use

Change the port in `package.json` dev script or stop processes using ports 5173 and 8090.

### Middleware not protecting routes

Check that your routes are not in the `publicRoutes` array in `src/middleware.ts`. The middleware automatically protects all routes except those listed.

## Contributing

This is part of the PocketKit template repository. See the main README for contribution guidelines.

## License

MIT License - see the main LICENSE file for details.
