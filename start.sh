#!/bin/bash

# Math Fast - Start Server and Client

echo "🎮 Starting Math Fast..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $SERVER_PID 2>/dev/null
    kill $CLIENT_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Server
echo "📡 Starting WebSocket Server (port 8080)..."
cd server
npm install 2>/dev/null
npm run dev &
SERVER_PID=$!
sleep 2

# Start Client
echo "🚀 Starting Next.js Client (port 3000)..."
cd ../client
npm install 2>/dev/null
npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Servers are running!"
echo ""
echo "📍 WebSocket Server: ws://localhost:8080"
echo "🌐 Client: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

wait

