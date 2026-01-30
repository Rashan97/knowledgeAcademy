@echo off
echo Stopping Node.js server...
taskkill /F /IM node.exe 2>nul

timeout /t 2 /nobreak >nul

echo Starting Node.js server...
cd /d "C:\New Projects\learning-platform"
start "Knowledge Academy Server" node server.js

timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo  Server is running!
echo  Access your site at: http://localhost:3000
echo ================================================
echo.
pause
