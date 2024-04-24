# PocketKit

PocketKit is a boilerplate for quickly starting up SaaS apps. It consists of SvelteKit, setup with Pocketbase.

SvelteKit add-ons
- MDSvex 
- TailwindCSS
- DaisyUI

SvelteKit preconfigured


## Setup


## Local development
```bash
cd ./app        # navigate to app folder
yarn            # install dependencies
yarn dev        # launches Pocketbase and SvelteKit dev server
```

Pocketbase AdminUI available on [`http://localhost:8090/_`](http://localhost:8090/_). API is available at `http://localhost:8090/api`.
SvelteKit dev server running by default on [`http://localhost:5173/`](http://localhost:5173/)

## Further development
- [ ] Migrations for admin user in Pocketbase (skip initial setup)
- [ ] Setup basic authentication example with SvelteKit (Lucia)
- [ ] Setup Dockerfile deployment for deploying pocketbase to fly.io