@echo off
setlocal
cd /d "%~dp0"
set ASTRO_TELEMETRY_DISABLED=1

if exist "%~dp0node_modules\node\bin\node.exe" (
  set "PATH=%~dp0node_modules\node\bin;%PATH%"
)

if not exist "%~dp0node_modules" (
  echo [Portfolio] Afhankelijkheden installeren...
  call npm install --no-audit --no-fund
)

echo [Portfolio] Live ontwikkelserver wordt gestart op http://127.0.0.1:4321/nl/
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://127.0.0.1:4321/nl/"
call npm run dev -- --host 127.0.0.1 --port 4321
pause
