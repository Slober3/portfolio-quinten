@echo off
setlocal
cd /d "%~dp0"
set ASTRO_TELEMETRY_DISABLED=1

if exist "%~dp0node_modules\node\bin\node.exe" (
  set "PATH=%~dp0node_modules\node\bin;%PATH%"
)

if not exist "%~dp0dist\nl\index.html" (
  echo [Portfolio] Nog geen productiebuild gevonden. Bezig met bouwen...
  call npm run build
  if errorlevel 1 (
    echo [Portfolio] Build mislukt. Controleer de foutmelding hierboven.
    pause
    exit /b 1
  )
)

where node >nul 2>&1
if %errorlevel%==0 (
  node "%~dp0scripts\local-preview-server.mjs"
  exit /b %errorlevel%
)

where python >nul 2>&1
if %errorlevel%==0 (
  python "%~dp0scripts\local-preview-server.py"
  exit /b %errorlevel%
)

echo [Portfolio] Noch Node.js noch Python gevonden op dit systeem.
pause
exit /b 1
