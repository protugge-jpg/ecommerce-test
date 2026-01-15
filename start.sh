#!/bin/bash

# Quick Start Guide for EcoStore
# Run this script to start both frontend and backend servers

echo "🛍️  EcoStore - Quick Start Guide"
echo "=================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install it from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js installed: $(node --version)"
echo ""

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found. Options:"
    echo "   1. Install locally: brew install mongodb-community"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo ""
    echo "For now, the app will work with localStorage (local storage in browser)"
    echo ""
fi

# Ask user what to start
echo "What would you like to start?"
echo "1) Frontend only (uses localStorage)"
echo "2) Backend server (requires MongoDB)"
echo "3) Both (requires MongoDB running)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting Frontend Server..."
        echo "   URL: http://localhost:8000"
        echo "   Press Ctrl+C to stop"
        echo ""
        cd /Users/indracyberschool/ecommerce
        python3 -m http.server 8000
        ;;
    2)
        echo ""
        echo "🚀 Starting Backend Server..."
        echo "   URL: http://localhost:3000"
        echo "   Press Ctrl+C to stop"
        echo ""
        cd /Users/indracyberschool/ecommerce
        npm start
        ;;
    3)
        echo ""
        echo "⚠️  Make sure MongoDB is running!"
        echo "   Run in another terminal: brew services start mongodb-community"
        echo ""
        read -p "Is MongoDB running? (y/n): " mongodb_check
        
        if [ "$mongodb_check" = "y" ]; then
            echo ""
            echo "🚀 Starting Backend Server (port 3000)..."
            cd /Users/indracyberschool/ecommerce
            npm start &
            BACKEND_PID=$!
            
            sleep 2
            
            echo ""
            echo "🚀 Starting Frontend Server (port 8000)..."
            python3 -m http.server 8000 &
            FRONTEND_PID=$!
            
            echo ""
            echo "✅ Both servers running!"
            echo "   Frontend: http://localhost:8000"
            echo "   Backend:  http://localhost:3000"
            echo ""
            echo "Press Ctrl+C to stop both servers"
            echo ""
            
            # Keep both processes alive
            wait
        else
            echo "❌ Please start MongoDB first and try again"
            exit 1
        fi
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
