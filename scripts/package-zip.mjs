#!/usr/bin/env node
/**
 * One-command static deployment packager:
 * 1. sanitize-gpx.mjs
 * 2. astro check
 * 3. astro build
 * 4. audit-opsec.mjs
 * 5. Packages dist/ contents (including .htaccess) at the archive root of release/portfolio-deploy.zip
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import archiver from 'archiver';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const releaseDir = path.join(rootDir, 'release');
const zipPath = path.join(releaseDir, 'portfolio-deploy.zip');

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

async function createZipArchive() {
  await fsp.mkdir(releaseDir, { recursive: true });
  const files = await walkFiles(distDir);

  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
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

  const stats = await fsp.stat(zipPath);
  const kb = (stats.size / 1024).toFixed(1);
  console.log(`\n[build:zip] Created release/portfolio-deploy.zip (${files.length} entries, ${kb} KB)`);
}

async function main() {
  runNodeStep('Step 1/4: Sanitize GPX tracks (+/- 5 km trim)', ['scripts/sanitize-gpx.mjs']);
  runNodeStep('Step 2/4: Type-check & Astro diagnostics', ['./node_modules/astro/bin/astro.mjs', 'check']);
  runNodeStep('Step 3/4: Static Astro production build', ['./node_modules/astro/bin/astro.mjs', 'build']);
  runNodeStep('Step 4/4: Run post-build OpSec audit', ['scripts/audit-opsec.mjs']);
  await createZipArchive();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
