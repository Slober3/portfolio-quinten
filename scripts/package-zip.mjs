#!/usr/bin/env node
/**
 * One-command static release packager:
 * 1. sanitize-gpx.mjs (+/- 5 km trim)
 * 2. astro check
 * 3. astro build
 * 4. audit-opsec.mjs (EXIF & PII leak gate)
 * 5. audit-site.mjs (internal links, hreflang, WCAG basics & JSON-LD gate)
 * 6. Creates TWO clean ZIP archives in release/:
 *    - release/portfolio-deploy.zip        -> Pure webhosting deploy (dist/ + .htaccess at root)
 *    - release/portfolio-local-preview.zip -> Standalone PC preview (extract & double-click START-HIER.bat)
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import archiver from 'archiver';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const releaseDir = path.join(rootDir, 'release');
const deployZipPath = path.join(releaseDir, 'portfolio-deploy.zip');
const localZipPath = path.join(releaseDir, 'portfolio-local-preview.zip');

function runNodeStep(label, scriptArgs) {
  console.log(`\n==> [build:zip] ${label}`);
  execFileSync(process.execPath, scriptArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: '1',
    },
  });
}

async function walkFiles(dir) {
  const results = [];
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkFiles(full)));
    } else if (entry.isFile()) {
      results.push(full);
    }
  }
  return results;
}

async function createDeployZip(files) {
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(deployZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    output.on('error', reject);
    archive.on('error', reject);
    archive.pipe(output);

    for (const fullPath of files) {
      const entryName = path.relative(distDir, fullPath).replace(/\\/g, '/');
      archive.file(fullPath, { name: entryName });
    }
    archive.finalize();
  });

  const stats = await fsp.stat(deployZipPath);
  console.log(
    `[build:zip] Created release/portfolio-deploy.zip (${files.length} entries, ${(stats.size / 1024).toFixed(1)} KB)`
  );
}

const START_HIER_BAT = `@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if %errorlevel%==0 (
  node "%~dp0server.mjs"
  exit /b %errorlevel%
)

where python >nul 2>&1
if %errorlevel%==0 (
  python "%~dp0server.py"
  exit /b %errorlevel%
)

where py >nul 2>&1
if %errorlevel%==0 (
  py -3 "%~dp0server.py"
  exit /b %errorlevel%
)

echo ====================================================================
echo  Kan geen Node.js of Python 3 vinden om de lokale server te starten.
echo  Installeer Node.js LTS (https://nodejs.org) of Python 3, en
echo  dubbelklik opnieuw op START-HIER.bat.
echo ====================================================================
pause
exit /b 1
`;

const START_HIER_SH = `#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if command -v node >/dev/null 2>&1; then
  exec node ./server.mjs
elif command -v python3 >/dev/null 2>&1; then
  exec python3 ./server.py
else
  echo "Installeer Node.js of Python 3 om de lokale preview te starten."
  exit 1
fi
`;

const LEES_MIJ_TXT = `QUINTEN DESMYTER PORTFOLIO — LOKALE PC PREVIEW
==============================================

Zo bekijk je de volledige website rechtstreeks op je eigen PC:

1. Pak dit volledige .zip-bestand eerst uit naar een gewone map (bv. op je Bureaublad of in Downloads).
   (Open START-HIER.bat niet rechtstreeks vanuit het ongeopende .zip-venster!)

2. Windows: Dubbelklik op  START-HIER.bat
   macOS / Linux: Voer  ./start-hier.sh  uit in de terminal.

3. Je standaardbrowser opent automatisch op:
   http://127.0.0.1:4321/nl/  (en /en/ voor de Engelse versie)

Waarom via START-HIER.bat in plaats van dubbelklikken op index.html?
Omdat interactieve onderdelen zoals de MapLibre GPX-routekaart, PhotoSwipe-galerij,
lokale fonts en schone /nl/ en /en/ URL's een lokale HTTP-server nodig hebben (anders
blokkeert de browser lokale bestanden door file:// CORS-beveiliging).

Stoppen: sluit het zwarte terminalvenster of druk op Ctrl + C.

Let op voor webhosting:
Upload NIET deze preview-zip naar je webhosting, maar gebruik daarvoor
release/portfolio-deploy.zip (die bevat uitsluitend de statische website + .htaccess).
`;

async function createLocalPreviewZip(files) {
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(localZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    output.on('error', reject);
    archive.on('error', reject);
    archive.pipe(output);

    for (const fullPath of files) {
      const rel = path.relative(distDir, fullPath).replace(/\\/g, '/');
      if (rel === '.htaccess') continue;
      archive.file(fullPath, { name: `site/${rel}` });
    }

    archive.file(path.join(rootDir, 'scripts', 'local-preview-server.mjs'), { name: 'server.mjs' });
    archive.file(path.join(rootDir, 'scripts', 'local-preview-server.py'), { name: 'server.py' });
    archive.append(START_HIER_BAT.replace(/\n/g, '\r\n'), { name: 'START-HIER.bat' });
    archive.append(START_HIER_SH, { name: 'start-hier.sh', mode: 0o755 });
    archive.append(LEES_MIJ_TXT.replace(/\n/g, '\r\n'), { name: 'LEES-MIJ-EERST.txt' });

    archive.finalize();
  });

  const stats = await fsp.stat(localZipPath);
  console.log(
    `[build:zip] Created release/portfolio-local-preview.zip (${files.length + 4} entries, ${(stats.size / 1024).toFixed(1)} KB)`
  );
}

async function main() {
  runNodeStep('Step 1/5: Sanitize GPX tracks (+/- 5 km trim)', ['scripts/sanitize-gpx.mjs']);
  runNodeStep('Step 2/5: Type-check & Astro diagnostics', ['./node_modules/astro/bin/astro.mjs', 'check']);
  runNodeStep('Step 3/5: Static Astro production build', ['./node_modules/astro/bin/astro.mjs', 'build']);
  runNodeStep('Step 4/5: Run post-build OpSec audit', ['scripts/audit-opsec.mjs']);
  runNodeStep('Step 5/5: Run SEO, A11y, link & JSON-LD audit', ['scripts/audit-site.mjs']);

  await fsp.mkdir(releaseDir, { recursive: true });
  const files = await walkFiles(distDir);
  await createDeployZip(files);
  await createLocalPreviewZip(files);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
