@echo off
echo Starting NTK Gallery Backend and Frontend...
echo.

echo Starting Backend Server on port 8080...
start "NTK Backend" cmd /k "cd /d %~dp0backend && node server.js"

echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server on port 3000...
start "NTK Frontend" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ====================================
echo NTK Gallery is starting up!
echo ====================================
echo Backend API: http://localhost:8080
echo Frontend App: http://localhost:3000
echo.
echo Both servers are starting in separate windows.
echo Close this window when done.
echo.
pause