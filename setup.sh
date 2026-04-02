#!/bin/bash

# ============================================
#   FitZone Dashboard — Setup Script
#   Run: bash setup.sh
# ============================================

echo ""
echo "🏋️  FitZone Dashboard — Starting setup..."
echo ""

# 1. Create Vite project
echo "📦 Creating Vite + React + TypeScript project..."
npm create vite@latest fitzone-dashboard -- --template react-ts
cd fitzone-dashboard

# 2. Install base dependencies
echo ""
echo "📥 Installing base dependencies..."
npm install

# 3. Install Tailwind CSS v4
echo ""
echo "🎨 Installing Tailwind CSS..."
npm install tailwindcss @tailwindcss/vite

# 4. Install React Router DOM (latest)
echo ""
echo "🔀 Installing React Router DOM..."
npm install react-router-dom

# 5. Install React Icons
echo ""
echo "🎯 Installing React Icons..."
npm install react-icons

# 6. Install extra useful libraries
echo ""
echo "📊 Installing extra libraries..."
npm install recharts                  # Charts
npm install clsx                      # Conditional classnames
npm install react-hot-toast           # Notifications

echo ""
echo "✅ All packages installed successfully!"
echo ""
echo "📁 Creating folder structure..."

# Create folder structure
mkdir -p src/assets
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/components/dashboard
mkdir -p src/components/members
mkdir -p src/components/payments
mkdir -p src/components/subscriptions
mkdir -p src/components/classes
mkdir -p src/pages
mkdir -p src/routes
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/constants
mkdir -p src/context
mkdir -p src/services

echo "✅ Folder structure created!"
echo ""
echo "🚀 Setup complete! Run:"
echo "   cd fitzone-dashboard"
echo "   npm run dev"
echo ""
