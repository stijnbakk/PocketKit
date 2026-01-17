# PocketKit

> Production-ready SvelteKit & Next.js + PocketBase boilerplates with authentication and automatic deployment

Build and deploy full-stack applications in minutes. PocketKit provides both SvelteKit and Next.js templates with PocketBase's backend-as-a-service, complete with authentication, database, and free deployment to Vercel and Fly.io.

[![Demo](https://img.shields.io/badge/demo-live-success)](https://pocketkit-demo-app.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Features

- ✅ **Authentication Ready** - Login, register, and session management pre-configured
- 🚀 **Free Deployment** - Frontend on Vercel, backend on Fly.io
- ⚡ **Fast Development** - Single command runs both frontend and backend
- 🔄 **Auto-Deploy** - Push to GitHub and deploy automatically
- 🔒 **Secure by Default** - HTTP-only cookies, server-side validation, CSRF protection
- 📱 **Responsive UI** - Built with Tailwind CSS
- 🎯 **TypeScript** - Fully typed with SvelteKit and PocketBase SDKs
- 📊 **Real-time Ready** - PocketBase subscriptions for live updates
- 🗄️ **SQLite Database** - Lightweight, serverless database included

## ⚡ Quick Start

Choose your framework and get started:

### SvelteKit App (Original)

```bash
# 1. Clone the repository
git clone https://github.com/stijnbakk/PocketKit.git
cd PocketKit

# 2. Run the get started script (does everything automatically)
./GET-STARTED.sh

# 3. Start coding
cd app
npm run dev  # or: yarn dev / pnpm dev
```

### React/Next.js App (New)

```bash
# 1. Clone the repository
git clone https://github.com/stijnbakk/PocketKit.git
cd PocketKit

# 2. Set up the React app
cd react-app
npm install  # or: yarn / pnpm install
cp .env.example .env.local

# 3. Download PocketBase (if not already done)
cd ../server
# Download from https://pocketbase.io/docs/ for your OS

# 4. Start coding
cd ../react-app
npm run dev  # Starts both frontend and backend
```

**What the script does:**
- ✅ Initializes a fresh git repository
- ✅ Installs dependencies (auto-detects npm/yarn/pnpm)
- ✅ Downloads PocketBase for your operating system
- ✅ Creates initial commit

**Access your app:**
- Frontend: `http://localhost:5173`
- Backend Admin: `http://localhost:8090/_`

First time? Create your admin account at `http://localhost:8090/_` and you're ready to go!

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git

## Demo

Check out the live demo: **[pocketkit-demo-app.vercel.app](https://pocketkit-demo-app.vercel.app)**

## Documentation

- 📖 **[Full Documentation Site](docs/)** - Complete guides and reference (Starlight)
- 🚀 **Quick Start** - See above for 60-second setup
- 🤖 **[CLAUDE.md](CLAUDE.md)** - Guide for working with this codebase in Claude Code
- 📚 **This README** - Overview, deployment, and architecture

The `/docs` folder contains the full documentation website built with Astro Starlight.

## Project Structure

```
PocketKit/
├── app/                    # SvelteKit frontend application
│   ├── src/
│   │   ├── routes/         # SvelteKit routes
│   │   │   ├── auth/       # Authentication pages
│   │   │   └── ...
│   │   ├── lib/            # Shared libraries
│   │   │   ├── pocketbase.ts           # Client-side PocketBase
│   │   │   └── server/pocketbase.ts    # Server-side helpers
│   │   └── hooks.server.ts # Server hooks for auth
│   └── package.json
│
├── react-app/              # Next.js frontend application (NEW!)
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   │   ├── api/        # API routes
│   │   │   ├── auth/       # Authentication pages
│   │   │   └── ...
│   │   └── lib/            # Shared libraries
│   │       ├── pocketbase.ts    # PocketBase client
│   │       └── auth.ts          # Auth utilities
│   ├── middleware.ts       # Route protection
│   └── package.json
│
├── server/                 # PocketBase backend (shared by both apps)
│   ├── Dockerfile          # Fly.io deployment config
│   ├── fly.toml            # Fly.io settings
│   └── pocketbase          # PocketBase executable (download separately)
│
├── docs/                   # Documentation site (Starlight)
├── CLAUDE.md               # Development guide for Claude Code
└── GET-STARTED.sh          # Quick setup script (for SvelteKit app)
```

## Tech Stack

### Frontend Options

**SvelteKit App:**
- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack framework
- **[Svelte 5](https://svelte.dev/)** - Reactive UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling

**React App:**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling

### Backend
- **[PocketBase](https://pocketbase.io/)** - Backend-as-a-service
- **SQLite** - Embedded database
- **Go** - PocketBase runtime

### Deployment
- **[Vercel](https://vercel.com/)** - Frontend hosting
- **[Fly.io](https://fly.io/)** - Backend hosting
- **GitHub Actions** - CI/CD

## Deployment

### Frontend (Vercel)

**For SvelteKit app:**
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set root directory to `app`
4. Add environment variable: `PUBLIC_POCKETBASE_URL=https://your-app.fly.dev`
5. Deploy

**For React/Next.js app:**
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set root directory to `react-app`
4. Add environment variable: `NEXT_PUBLIC_POCKETBASE_URL=https://your-app.fly.dev`
5. Deploy

### Backend (Fly.io)

1. Install Fly.io CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `flyctl auth login`
3. Navigate to server directory: `cd server`
4. Update `fly.toml` with your app name
5. Create volume: `flyctl volumes create pb_data --size 1`
6. Deploy: `flyctl deploy`

Your backend will be live at `https://your-app-name.fly.dev`. Use this URL as the `PUBLIC_POCKETBASE_URL` (SvelteKit) or `NEXT_PUBLIC_POCKETBASE_URL` (React) in Vercel.

## Authentication Flow

Both apps use cookie-based authentication with server-side validation:

**SvelteKit:**
```
User → SvelteKit → Server Hook → PocketBase → SQLite
  ↑                    ↓
  └─── HTTP-only Cookie ────┘
```

**Next.js:**
```
User → Next.js → Middleware → PocketBase → SQLite
  ↑                    ↓
  └─── HTTP-only Cookie ────┘
```

Key features:
- HTTP-only cookies (XSS protection)
- Server-side validation on every request
- Automatic token refresh
- CSRF protection with SameSite cookies

See [CLAUDE.md](CLAUDE.md) for detailed authentication architecture documentation and [react-app/README.md](react-app/README.md) for React-specific docs.

## Environment Variables

**SvelteKit app** - Create `.env` in the `app/` directory:
```bash
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090  # Local development
# PUBLIC_POCKETBASE_URL=https://your-app.fly.dev  # Production
```

**React app** - Create `.env.local` in the `react-app/` directory:
```bash
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090  # Local development
# NEXT_PUBLIC_POCKETBASE_URL=https://your-app.fly.dev  # Production
```

## Scripts

**SvelteKit app** - Run from the `app/` directory:
```bash
yarn dev          # Start both frontend and backend
yarn dev:app      # Start only frontend
yarn dev:server   # Start only backend
yarn build        # Build for production
yarn preview      # Preview production build
```

**React app** - Run from the `react-app/` directory:
```bash
npm run dev       # Start both frontend and backend
npm run dev:app   # Start only frontend
npm run dev:server # Start only backend
npm run build     # Build for production
npm run start     # Start production server
```

## Customization

### Add OAuth Providers

1. Go to PocketBase Admin → Settings → Auth providers
2. Enable and configure providers (Google, GitHub, etc.)
3. Update login page with OAuth buttons

### Custom User Fields

1. PocketBase Admin → Collections → users → Fields
2. Add your custom fields
3. Update the `PbUser` type:
   - **SvelteKit:** `app/src/lib/server/pocketbase.ts`
   - **React:** `react-app/src/lib/pocketbase.ts`

### Styling

Both apps use Tailwind CSS 4:
- **SvelteKit:** Customize in `app/src/app.css`
- **React:** Customize in `react-app/src/app/globals.css` and `react-app/tailwind.config.ts`

## Common Issues

### PocketBase not starting

Make sure the `pocketbase` executable is in the `server/` directory and is executable:

```bash
chmod +x server/pocketbase
```

### Port already in use

Change the port in your dev script or stop processes using ports 5173 and 8090.

### macOS security warning

Go to System Settings → Privacy & Security and allow the PocketBase executable to run.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PocketBase](https://pocketbase.io/) - Amazing backend-as-a-service
- [SvelteKit](https://kit.svelte.dev/) - Powerful full-stack framework
- [Svelte](https://svelte.dev/) - Cybernetically enhanced web apps
- [Next.js](https://nextjs.org/) - The React framework for production
- [React](https://react.dev/) - Library for building user interfaces

## Support

- 📖 Read the [README.md](readme.md) and [CLAUDE.md](CLAUDE.md)
- 🐛 [Report issues](https://github.com/stijnbakk/PocketKit/issues)
- 💬 [Discussions](https://github.com/stijnbakk/PocketKit/discussions)
- ⭐ Star this repo if you find it helpful!

---

Built with ❤️ by [Stijn](https://github.com/stijnbakk)
