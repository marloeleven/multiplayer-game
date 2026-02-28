@echo off
REM Math Fast - Start Server and Client (Windows)

echo 🎮 Starting Math Fast...
echo.

REM Check if node is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Start Server
echo 📡 Starting WebSocket Server (port 8080)...
cd server
call npm install >nul 2>&1
start "Math Fast Server" cmd /k npm run dev

REM Give server time to start
timeout /t 3 /nobreak

REM Start Client
echo 🚀 Starting Next.js Client (port 3000)...
cd ..\client
call npm install >nul 2>&1
start "Math Fast Client" cmd /k npm run dev

echo.
echo ✅ Both servers are starting!
echo.
echo 📍 WebSocket Server: ws://localhost:8080
echo 🌐 Client: http://localhost:3000
echo.
echo Both servers will open in separate windows.
echo When you're done, close the server windows or press Ctrl+C.

cd ..
pause

