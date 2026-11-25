#!/usr/bin/env node
/**
 * Zero-dependency local HTTP preview server for Quinten's static portfolio.
 * Works on any Node.js >= 16 (no npm install or node_modules required!).
 * Serves ./site/ when unpacked from portfolio-local-preview.zip, or ./dist/ in the repo.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const noOpen = process.argv.includes('--no-open');
const requestedPortArg = process.argv.find((a) => a.startsWith('--port='));
const startPort = requestedPortArg ? Number(requestedPortArg.split('=')[1]) || 4321 : 4321;

const candidateRoots = [
  path.join(__dirname, 'site'),
  path.join(__dirname, '..', 'dist'),
  path.join(process.cwd(), 'site'),
  path.join(process.cwd(), 'dist'),
];

const staticRoot = candidateRoots.find((dir) => fs.existsSync(path.join(dir, 'nl', 'index.html')));

if (!staticRoot) {
  console.error('[preview] Geen gebouwde website gevonden (verwacht ./site/ of ./dist/).');
  console.error('[preview] Draai eerst "npm run build" in de projectmap of pak portfolio-local-preview.zip volledig uit.');
  process.exit(1);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.gpx': 'application/gpx+xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
};

function safeResolve(urlPath) {
  let decoded = '/';
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }
  const normalized = path.posix.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, '');
  const full = path.resolve(staticRoot, '.' + normalized);
  if (!full.startsWith(path.resolve(staticRoot))) return null;
  return { decoded: normalized, full };
}

function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
  });
  fs.createReadStream(filePath).pipe(res);
}

function openBrowser(url) {
  if (noOpen) return;
  const cmd =
    process.platform === 'win32'
      ? `start "" "${url}"`
      : process.platform === 'darwin'
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

function createServer() {
  return http.createServer((req, res) => {
    const reqUrl = req.url || '/';

    if (reqUrl === '/' || reqUrl === '/index.html') {
      const acceptLang = String(req.headers['accept-language'] || '').toLowerCase();
      const target = acceptLang.startsWith('en') ? '/en/' : '/nl/';
      res.writeHead(302, { Location: target, Vary: 'Accept-Language' });
      res.end();
      return;
    }

    const resolved = safeResolve(reqUrl);
    if (!resolved) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }

    const candidates = [
      resolved.full,
      path.join(resolved.full, 'index.html'),
      `${resolved.full}.html`,
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        sendFile(res, candidate, 200);
        return;
      }
    }

    const isEn = resolved.decoded.startsWith('/en/');
    const notFoundFile = path.join(staticRoot, isEn ? 'en' : 'nl', '404', 'index.html');
    if (fs.existsSync(notFoundFile)) {
      sendFile(res, notFoundFile, 404);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  });
}

function listenWithFallback(port, attemptsLeft = 10) {
  const server = createServer();
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      listenWithFallback(port + 1, attemptsLeft - 1);
    } else {
      console.error('[preview] Kan lokale server niet starten:', err.message);
      process.exit(1);
    }
  });
  server.listen(port, '127.0.0.1', () => {
    const url = `http://127.0.0.1:${port}/nl/`;
    console.log('');
    console.log('===============================================================');
    console.log('  Quinten Desmyter Portfolio — Lokale Preview Actief');
    console.log(`  Open in browser: ${url}`);
    console.log(`  Engelse versie : http://127.0.0.1:${port}/en/`);
    console.log('  Stoppen        : Sluit dit venster of druk Ctrl + C');
    console.log('===============================================================');
    console.log('');
    openBrowser(url);
  });
}

listenWithFallback(startPort);
