# PocketKit

`PocketKit`is a super simple boilerplate for SvelteKit and Pocketbase, preconfigured with some things I like:

- TypeScript
- Yarn as package manager
- Tailwind for styles, including `tailwindcss/typography`
- SASS for styles
- DaisyUI for styled components
- MDSvex for MDX support
- Prettier for auto formatting
- Basic authentication with email+password via pocketbase


## Folder structure
- **`/app`** - SvelteKit app
- **`/server`** - PocketBase server

## Setup for local development
1. Make sure `pocketbase` executable is compatible with your system
Currently included version is for MacOS ARM64, `v0.22.9`. See full list on [Pocketbase](https://pocketbase.io/docs/)

2. Setup `.env` in `/app`:
``` txt
# .env for /app
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

2. Navigate to app `cd ./app`, install dependencies `yarn install`

## Use
```bash
cd ./app
# from /app
yarn dev
```

Launches both Pocketbase and SvelteKit:
| Service | Address |
| -- | --- |
| PocketBase adminUI | [http://localhost:8090/_](http://localhost:8090/_) |
| PocketBase API | [http://localhost:8090/api](http://localhost:8090/api) |
| SvelteKit dev server | [http://localhost:5173](http://localhost:5173) |


## Further development
- [ ] Document authentication
- [ ] Docker setup to deploy to fly.io
- [ ] PocketBase migration file for initial setup