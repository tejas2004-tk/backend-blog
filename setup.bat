@echo off
echo ================================
echo Blog Management System - Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%
echo.

REM Backend Setup
echo Configuring Backend...
cd blog-backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠ Please update .env with your MongoDB URI
)

cd ..
echo ✓ Backend setup complete
echo.

REM Frontend Setup
echo Configuring Frontend...
cd blog-frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

if not exist ".env.local" (
    echo Creating .env.local file from .env.example...
    copy .env.example .env.local
)

cd ..
echo ✓ Frontend setup complete
echo.

echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Update .env files with correct URLs
echo 2. Ensure MongoDB is running
echo 3. Run backend:  cd blog-backend ^& npm run dev
echo 4. Run frontend: cd blog-frontend ^& npm run dev
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
pause
