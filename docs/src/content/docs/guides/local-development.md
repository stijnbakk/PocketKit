---
title: Local Development
description: Learn how to run PocketKit locally for development
---

This guide will help you get PocketKit running on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **Yarn** package manager
- **Git**

## Clone the Repository

First, clone the PocketKit repository:

```bash
git clone https://github.com/stijnbakk/PocketKit.git
cd PocketKit
```

## Project Structure

PocketKit is organized into two main directories:

```
PocketKit/
├── app/           # SvelteKit frontend application
├── server/        # PocketBase backend
└── docs/          # Documentation (Starlight)
```

## Install Dependencies

Navigate to the `app` directory and install the dependencies:

```bash
cd app
yarn install
```

## Download PocketBase

For local development, you need to download the PocketBase executable:

1. Visit [pocketbase.io](https://pocketbase.io/docs/)
2. Download the appropriate version for your operating system
3. Place the `pocketbase` executable in the `server/` directory

**Note**: Make sure the file is named `pocketbase` and is executable.

On macOS/Linux, you may need to make it executable:

```bash
chmod +x ../server/pocketbase
```

## Start Development Server

From the `app` directory, run:

```bash
yarn dev
```

This single command will:
- Start the SvelteKit dev server on `http://localhost:5173`
- Launch PocketBase on `http://localhost:8090`

:::tip
The `yarn dev` command runs both servers simultaneously. Check `app/package.json` to see how this works:

```json
{
  "scripts": {
    "dev": "yarn dev:app & yarn dev:server",
    "dev:app": "vite dev",
    "dev:server": "cd ../server && ./pocketbase serve"
  }
}
```
:::

## Access the Application

Once both servers are running:

- **Frontend**: http://localhost:5173
- **PocketBase Admin**: http://localhost:8090/_

## Set Up PocketBase Admin

On first run, you'll need to create an admin account:

1. Visit http://localhost:8090/_
2. Create your admin email and password
3. This account is for managing your backend (users, collections, settings)

## Environment Variables

The app uses environment variables for configuration. Create a `.env` file in the `app/` directory:

```bash
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

:::note
This is the default value. When you deploy to production, you'll update this to your Fly.io URL.
:::

## Development Workflow

### Making Changes

- **Frontend code**: Edit files in `app/src/` - changes will hot reload automatically
- **Backend schema**: Use the PocketBase admin UI at http://localhost:8090/_
- **Backend hooks**: Add JavaScript/TypeScript files to `server/pb_hooks/` (requires PocketBase restart)

### Database

PocketBase uses SQLite and stores all data in `server/pb_data/`. This directory is created automatically when you first run PocketBase.

:::caution
The `server/pb_data/` directory is gitignored. Your local database is separate from production.
:::

### Testing Authentication

The boilerplate includes complete auth flows:

- **Register**: http://localhost:5173/auth/register
- **Login**: http://localhost:5173/auth/login
- **Logout**: Handled via the logout endpoint

Create a test user to verify everything works.

## Common Issues

### Port Already in Use

If port 5173 or 8090 is already in use:

- **SvelteKit**: Stop the process using port 5173, or modify the port in `vite.config.ts`
- **PocketBase**: Stop any running PocketBase instances, or modify the port in the dev script

### PocketBase Not Found

If you get an error about PocketBase not being found:

1. Make sure you downloaded the PocketBase executable
2. Verify it's in the `server/` directory
3. Ensure it's named `pocketbase` (no file extension on macOS/Linux)
4. Verify it's executable (`chmod +x server/pocketbase` on macOS/Linux)

### Permission Denied (macOS)

On macOS, you might see a security warning when running PocketBase:

1. Go to **System Settings** → **Privacy & Security**
2. Look for a message about PocketBase being blocked
3. Click **Allow Anyway**
4. Run `yarn dev` again

## Next Steps

Now that you have PocketKit running locally:

- Explore the [Authentication system](/concepts/auth/) to understand how auth works
- Learn how to [Deploy to production](/guides/deployment/)
- Start building your app by modifying the files in `app/src/routes/`
