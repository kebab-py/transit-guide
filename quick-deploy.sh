#!/bin/bash

# Transit Guide - Quick Update & Deploy Script
# This script will update your local files and push to GitHub

echo "🚀 Transit Guide - Quick Deploy"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in transit-guide directory"
    echo "Please run this script from inside your transit-guide folder"
    echo ""
    echo "Example:"
    echo "  cd ~/Downloads/transit-guide"
    echo "  bash quick-deploy.sh"
    exit 1
fi

echo "✅ Found transit-guide project"
echo ""

# Check git status
echo "📊 Checking git status..."
if ! git status &> /dev/null; then
    echo "⚠️  Git not initialized. Setting up..."
    git init
    git remote add origin https://github.com/kebab-py/transit-guide.git
    git branch -M main
fi

echo "✅ Git is ready"
echo ""

# Add all changes
echo "📦 Adding all changes..."
git add -A

# Show what's changed
echo ""
echo "📝 Files that will be committed:"
git status --short
echo ""

# Commit
echo "💾 Creating commit..."
read -p "Enter commit message (or press Enter for default): " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update: Latest design changes"
fi

git commit -m "$commit_msg"

# Push
echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Your changes are live on GitHub!"
    echo "🌐 Netlify will deploy in 2-3 minutes"
    echo "🔗 Check: https://dreamy-pegasus-767c58.netlify.app/"
else
    echo ""
    echo "⚠️  Push failed. You may need to:"
    echo "1. Pull first: git pull origin main"
    echo "2. Then push again: git push origin main"
    echo ""
    echo "Or if this is your first push:"
    echo "git push -u origin main"
fi

echo ""
echo "Done! 🎉"
