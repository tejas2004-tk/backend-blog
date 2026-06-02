#!/bin/bash

echo "================================"
echo "Blog Management System - Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd blog-backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your MongoDB URI"
fi

cd ..
echo "✅ Backend setup complete"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd blog-frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file from .env.example..."
    cp .env.example .env.local
fi

cd ..
echo "✅ Frontend setup complete"
echo ""

echo "================================"
echo "Setup Complete! 🎉"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update .env files with correct URLs"
echo "2. Ensure MongoDB is running"
echo "3. Run backend:  cd blog-backend && npm run dev"
echo "4. Run frontend: cd blog-frontend && npm run dev"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
