# NTK Gallery Quick Start Script
Write-Host "🚀 Starting NTK Gallery..." -ForegroundColor Green

# Start Backend
Write-Host "📡 Starting Backend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🎨 Starting Frontend Application..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start"

Write-Host "" 
Write-Host "✅ NTK Gallery is starting up!" -ForegroundColor Green
Write-Host "🔗 Backend API: http://localhost:8080" -ForegroundColor Yellow
Write-Host "🌐 Frontend App: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")