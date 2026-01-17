# Server readme

Server uses `pocketbase`, which is deployed via Fly.io

## Running the server locally

```bash
./server/pocketbase serve
```

Loads the app on

- [Admin interface on `http://localhost:8090/_`](http://localhost:8090/_)

## Install locally

1. Download `pocketbase` from pocketbase.io, put in `/server` directory

## Initial deployment and setting up fly.io

Make sure `flyctl` is installed, setup initial fly login and stuff for your device

```bash
flyctl auth login
```

`Dockerfile` has already been created, please update the PB version number acordingly

```Dockerfile
# ./server/Dockerfile
ARG PB_VERSION=0.36.0
```

Update the `server/fly.toml` accordingly with app name and other settings

```toml
# server/fly.toml
```

Setup initial fly instance, accept configuration settings from the `fly.toml`

```bash
cd ./server
flyctl launch
```

A website will open which will allow you to check the app settings

Now the app will be deployed, but it won't work yet because it does not yet have persistent storage of the database.

```bash
flyctl volumes create pb_data --region ams --size 1  # 1GB volume
```

Now deploy the app

```bash
flyctl deploy
```

App is now running at the displayed address `app-name.fly.dev`

Visit the addres suffixed with `/_` to login

If you do not have access as a superuser, create or update a superuser account using this

```bash
flyctl ssh console
/pb/pocketbase superuser create <email> <password>
# or
/pb/pocketbase superuser update <email> <password>
```

## Triggering a manual (re-)deployment of the server on fly.io

```bash
flyctl deploy
```

## Setting up automatic deployment to fly.io

It is possible to setup automatic deployment to fly.io via Github Actions. For this follow these steps

Get a token

```bash
flyctl tokens create deploy
```

Add the token as a variabel in Github:

1. Settings → Secrets and variables → Actions
2. Click New repository secret
3. Name: `FLY_API_TOKEN`
4. Value: Paste the token from Step 1
5. Click Add secret

Update `/.github/workflows/fly-deploy.yml` to match with the correct app name, use `flyctl app list` if necessary to get the correct name.

```yml
# last section of .github/workflows/fly-deploy.yml
- name: Deploy
  if: env.no_changes == 'false'
  run: |
    cd server
    flyctl deploy --remote-only -a gym-app-server
```
