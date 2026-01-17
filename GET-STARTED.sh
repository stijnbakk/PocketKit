#!/bin/bash

# PocketKit - Get Started Script
# This script helps you quickly set up PocketKit for your new project

set -e  # Exit on error

echo "🚀 Welcome to PocketKit!"
echo ""
echo "This script will help you set up your new project."
echo ""

# Step 0: Choose framework
echo "📦 Which framework would you like to use?"
echo ""
echo "  1) SvelteKit (app-svelte)"
echo "  2) React/Next.js (app-react)"
echo ""
read -p "Enter your choice (1 or 2): " -n 1 -r
echo ""

if [[ $REPLY == "1" ]]; then
    APP_DIR="app-svelte"
    FRAMEWORK="SvelteKit"
    echo "✅ Selected: SvelteKit"
elif [[ $REPLY == "2" ]]; then
    APP_DIR="app-react"
    FRAMEWORK="React/Next.js"
    echo "✅ Selected: React/Next.js"
else
    echo "❌ Invalid choice. Please run the script again and select 1 or 2."
    exit 1
fi
echo ""

# Step 1: Initialize Git
echo "📦 Step 1/4: Setting up git repository..."
if [ -d ".git" ]; then
    read -p "Remove existing .git folder and start fresh? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf .git
        git init
        echo "✅ New git repository initialized"
    else
        echo "ℹ️  Keeping existing git repository"
    fi
else
    git init
    echo "✅ Git repository initialized"
fi

# Step 2: Install dependencies
echo ""
echo "📦 Step 2/4: Installing dependencies..."
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    cd "$APP_DIR" && pnpm install && cd ..
elif command -v yarn &> /dev/null; then
    echo "Using yarn..."
    cd "$APP_DIR" && yarn install && cd ..
elif command -v npm &> /dev/null; then
    echo "Using npm..."
    cd "$APP_DIR" && npm install && cd ..
else
    echo "⚠️  No package manager found. Please install Node.js and a package manager."
    echo "Skipping dependency installation."
fi
echo "✅ Dependencies installed"

# Step 3: Download PocketBase
echo ""
echo "📦 Step 3/4: Setting up PocketBase..."
if [ ! -f "server/pocketbase" ]; then
    echo ""
    echo "PocketBase executable not found. Attempting to download..."

    # Detect OS and architecture
    OS=$(uname -s)
    ARCH=$(uname -m)

    if [ "$OS" = "Linux" ]; then
        if [ "$ARCH" = "x86_64" ]; then
            PB_URL="https://github.com/pocketbase/pocketbase/releases/download/v0.23.5/pocketbase_0.23.5_linux_amd64.zip"
        elif [ "$ARCH" = "aarch64" ]; then
            PB_URL="https://github.com/pocketbase/pocketbase/releases/download/v0.23.5/pocketbase_0.23.5_linux_arm64.zip"
        fi
    elif [ "$OS" = "Darwin" ]; then
        if [ "$ARCH" = "arm64" ]; then
            PB_URL="https://github.com/pocketbase/pocketbase/releases/download/v0.23.5/pocketbase_0.23.5_darwin_arm64.zip"
        else
            PB_URL="https://github.com/pocketbase/pocketbase/releases/download/v0.23.5/pocketbase_0.23.5_darwin_amd64.zip"
        fi
    fi

    if [ -n "$PB_URL" ]; then
        echo "Downloading PocketBase for $OS ($ARCH)..."
        curl -L "$PB_URL" -o /tmp/pocketbase.zip
        unzip -o /tmp/pocketbase.zip -d server/
        rm /tmp/pocketbase.zip
        chmod +x server/pocketbase
        echo "✅ PocketBase downloaded and ready"
    else
        echo "⚠️  Could not auto-detect system. Please manually download PocketBase from:"
        echo "   https://pocketbase.io/docs/"
        echo "   and place it in the server/ directory"
    fi
else
    echo "✅ PocketBase already exists"
fi

# Step 4: Create initial commit
echo ""
echo "📦 Step 4/4: Creating initial commit..."
git add .
git commit -m "Initial commit - Starting new project with PocketKit" || echo "ℹ️  Nothing to commit or already committed"
echo "✅ Initial commit created"

echo ""
echo "🎉 Success! Your PocketKit project is ready!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo ""
echo "  1. Start development servers:"
echo "     cd $APP_DIR"
echo "     npm run dev    (or: yarn dev / pnpm dev)"
echo ""

if [[ $APP_DIR == "app-svelte" ]]; then
    echo "  2. Access your app:"
    echo "     Frontend:  http://localhost:5173"
    echo "     Backend:   http://localhost:8090/_"
else
    echo "  2. Access your app:"
    echo "     Frontend:  http://localhost:3000"
    echo "     Backend:   http://localhost:8090/_"
fi

echo ""
echo "  3. Create PocketBase admin account at:"
echo "     http://localhost:8090/_"
echo ""
echo "  4. Start building your app!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation: Check out /docs or CLAUDE.md"
echo "🐛 Issues: https://github.com/stijnbakk/PocketKit/issues"
echo ""
echo "Happy coding! 🚀"
echo ""
