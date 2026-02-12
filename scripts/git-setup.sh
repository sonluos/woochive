#!/bin/bash

# Woochive Git Setup Script
# This script helps you set up Git repository and push to GitHub

set -e

echo "🚀 Woochive Git Setup Script"
echo "=============================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    echo "Please install Git first:"
    echo "  macOS: brew install git"
    echo "  Ubuntu: sudo apt-get install git"
    echo "  Windows: Download from https://git-scm.com/download/win"
    exit 1
fi

echo "✅ Git is installed: $(git --version)"
echo ""

# Check if already initialized
if [ -d .git ]; then
    echo "⚠️  Git repository already initialized"
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
else
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git repository initialized"
fi

echo ""

# Check git config
if [ -z "$(git config user.name)" ] || [ -z "$(git config user.email)" ]; then
    echo "⚠️  Git user information not set"
    read -p "Enter your name: " git_name
    read -p "Enter your email: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
    echo "✅ Git user information set"
fi

echo ""
echo "👤 Git User: $(git config user.name) <$(git config user.email)>"
echo ""

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Creating initial commit..."
    git add .
    git commit -m "Initial commit: Woochive portfolio website with admin CMS

- React + TypeScript + Vite 기반 포트폴리오
- 5개 주요 페이지 (Home, About, Projects, Music, Publications)
- 관리자 CMS 기능 (인증, CRUD)
- 42개 속성 기반 테스트
- 반응형 디자인 및 다크 모드 지원
- SEO 최적화 (메타 태그, sitemap, robots.txt)
- ErrorBoundary 및 성능 최적화"
    echo "✅ Initial commit created"
else
    echo "✅ No uncommitted changes"
fi

echo ""

# Check for remote
if git remote | grep -q origin; then
    echo "✅ Remote 'origin' already exists: $(git remote get-url origin)"
    read -p "Do you want to change it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter GitHub repository URL: " repo_url
        git remote set-url origin "$repo_url"
        echo "✅ Remote URL updated"
    fi
else
    echo "🔗 Setting up remote repository..."
    read -p "Enter your GitHub username: " github_user
    read -p "Enter repository name (default: woochive): " repo_name
    repo_name=${repo_name:-woochive}
    
    echo ""
    echo "Choose connection method:"
    echo "1) HTTPS (recommended for beginners)"
    echo "2) SSH (requires SSH key setup)"
    read -p "Enter choice (1 or 2): " -n 1 -r
    echo
    
    if [[ $REPLY == "2" ]]; then
        repo_url="git@github.com:$github_user/$repo_name.git"
    else
        repo_url="https://github.com/$github_user/$repo_name.git"
    fi
    
    git remote add origin "$repo_url"
    echo "✅ Remote 'origin' added: $repo_url"
fi

echo ""
echo "🚀 Ready to push to GitHub!"
echo ""
echo "Next steps:"
echo "1. Create repository on GitHub: https://github.com/new"
echo "   - Repository name: woochive (or your chosen name)"
echo "   - Don't initialize with README, .gitignore, or license"
echo ""
echo "2. Run: git push -u origin main"
echo ""
echo "Or run this script with --push flag to push automatically"

if [ "$1" == "--push" ]; then
    echo ""
    read -p "Push to GitHub now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📤 Pushing to GitHub..."
        git push -u origin main
        echo "✅ Successfully pushed to GitHub!"
        echo ""
        echo "🎉 All done! Check your repository on GitHub."
    fi
fi

echo ""
echo "✨ Git setup complete!"
