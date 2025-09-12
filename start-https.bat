@echo off
echo 🔒 Starting Qiskit Fall Fest 2024 HTTPS Server...
echo.

REM Check if certificates exist
if not exist "certs\server.key" (
    echo ❌ SSL certificates not found!
    echo 🔧 Generating certificates first...
    echo.
    node generate-certs.js
    echo.
    if errorlevel 1 (
        echo ❌ Failed to generate certificates!
        pause
        exit /b 1
    )
)

echo 🚀 Starting HTTPS server...
node server-https.js

pause

