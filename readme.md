# PocketKit

> A production-ready SvelteKit + PocketBase boilerplate with authentication and automatic deployment

Build and deploy full-stack applications in minutes. PocketKit combines the power of SvelteKit with PocketBase's backend-as-a-service, complete with authentication, database, and free deployment to Vercel and Fly.io.

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

Get started in 60 seconds:

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
├── server/                 # PocketBase backend
│   ├── Dockerfile          # Fly.io deployment config
│   ├── fly.toml            # Fly.io settings
│   └── pocketbase          # PocketBase executable (download separately)
│
├── CLAUDE.md               # Development guide for Claude Code
└── GET-STARTED.sh          # Quick setup script
```

## Tech Stack

### Frontend
- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack framework
- **[Svelte 5](https://svelte.dev/)** - Reactive UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling

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

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set root directory to `app`
4. Add environment variable: `PUBLIC_POCKETBASE_URL=https://your-app.fly.dev`
5. Deploy

### Backend (Fly.io)

1. Install Fly.io CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `flyctl auth login`
3. Navigate to server directory: `cd server`
4. Update `fly.toml` with your app name
5. Create volume: `flyctl volumes create pb_data --size 1`
6. Deploy: `flyctl deploy`

Your backend will be live at `https://your-app-name.fly.dev`. Use this URL as the `PUBLIC_POCKETBASE_URL` in Vercel.

## Authentication Flow

PocketKit uses cookie-based authentication with server-side validation:

```
User → SvelteKit → Server Hook → PocketBase → SQLite
  ↑                    ↓
  └─── HTTP-only Cookie ────┘
```

Key features:
- HTTP-only cookies (XSS protection)
- Server-side validation on every request
- Automatic token refresh
- CSRF protection with SameSite cookies

See [CLAUDE.md](CLAUDE.md) for detailed authentication architecture documentation.

## Environment Variables

Create a `.env` file in the `app/` directory:

```bash
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090  # Local development
# PUBLIC_POCKETBASE_URL=https://your-app.fly.dev  # Production
```

## Scripts

All scripts are run from the `app/` directory:

```bash
yarn dev          # Start both frontend and backend
yarn dev:app      # Start only frontend
yarn dev:server   # Start only backend
yarn build        # Build for production
yarn preview      # Preview production build
```

## Customization

### Add OAuth Providers

1. Go to PocketBase Admin → Settings → Auth providers
2. Enable and configure providers (Google, GitHub, etc.)
3. Update login page with OAuth buttons

### Custom User Fields

1. PocketBase Admin → Collections → users → Fields
2. Add your custom fields
3. Update the `PbUser` type in `app/src/lib/server/pocketbase.ts`

### Styling

PocketKit uses Tailwind CSS 4. Customize your theme in `app/src/app.css`.

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

## Support

- 📖 Read the [README.md](readme.md) and [CLAUDE.md](CLAUDE.md)
- 🐛 [Report issues](https://github.com/stijnbakk/PocketKit/issues)
- 💬 [Discussions](https://github.com/stijnbakk/PocketKit/discussions)
- ⭐ Star this repo if you find it helpful!

---

Built with ❤️ by [Stijn](https://github.com/stijnbakk)
