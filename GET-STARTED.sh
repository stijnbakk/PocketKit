#!/bin/bash

# PocketKit - Get Started Script
# This script prepares PocketKit for your new project by:
# - Removing the docs folder
# - Removing the .git folder
# - Initializing a new git repository
# - Creating an initial commit

set -e  # Exit on error

echo "🚀 Welcome to PocketKit!"
echo ""
echo "This script will prepare PocketKit for your new project."
echo "It will:"
echo "  1. Remove the documentation folder (docs/)"
echo "  2. Remove the existing .git folder"
echo "  3. Initialize a new git repository"
echo "  4. Create an initial commit"
echo ""

# Confirm with user
read -p "Do you want to continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled."
    exit 1
fi

echo ""
echo "📦 Step 1/4: Removing documentation folder..."
if [ -d "docs" ]; then
    rm -rf docs
    echo "✅ Documentation folder removed"
else
    echo "ℹ️  Documentation folder not found (already removed?)"
fi

echo ""
echo "📦 Step 2/4: Removing existing .git folder..."
if [ -d ".git" ]; then
    rm -rf .git
    echo "✅ Existing git repository removed"
else
    echo "ℹ️  .git folder not found (already removed?)"
fi

echo ""
echo "📦 Step 3/4: Initializing new git repository..."
git init
echo "✅ New git repository initialized"

echo ""
echo "📦 Step 4/4: Creating initial commit..."
git add .
git commit -m "Initial commit - PocketKit boilerplate"
echo "✅ Initial commit created"

echo ""
echo "🎉 Success! PocketKit is ready for development."
echo ""
echo "Next steps:"
echo ""
echo "  1. Install dependencies:"
echo "     cd app"
echo "     yarn install"
echo ""
echo "  2. Download PocketBase executable from pocketbase.io"
echo "     and place it in the server/ directory"
echo ""
echo "  3. Start development servers:"
echo "     yarn dev"
echo ""
echo "  4. Visit http://localhost:8090/_ to set up your admin account"
echo ""
echo "  5. Start building your app at http://localhost:5173"
echo ""
echo "Happy coding! 🚀"
echo ""
