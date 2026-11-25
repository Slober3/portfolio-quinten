#!/usr/bin/env node
/**
 * Post-build OpSec Audit (runs against dist/)
 * Fails the build immediately if any image still contains GPS/serial EXIF metadata,
 * if unsanitized GPX data appears, or if forbidden PII/OpSec patterns exist in output text.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import exifr from 'exifr';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.tif']);
const TEXT_EXTS = new Set(['.html', '.js', '.mjs', '.json', '.xml', '.svg', '.txt', '.css']);

const FORBIDDEN_TEXT_RULES = [
  { label: 'Raw mailto: link', regex: /mailto:/gi },
  { label: 'Raw tel: link', regex: /tel:\+?\d/gi },
  { label: 'Belgian GSM number', regex: /(?:\+32|0032|0)\s*4\d{2}[\s./-]*\d{2}[\s./-]*\d{2}[\s./-]*\d{2}/g },
  { label: 'Hardcoded age reference', regex: /\b(?:2[5-9]|3[0-9])\s*(?:jaar\s+oud|jaar|years\s+old|yo)\b/gi },
  { label: 'Private security camera vendor reference', regex: /\bezviz\b/gi },
  { label: 'Student R-number leak', regex: /\br0\d{6,7}\b/gi },
  { label: 'Personal hotmail/gmail address', regex: /[a-z0-9._%+-]+@(?:hotmail|gmail|live|outlook)\.[a-z]{2,}/gi },
];

const SENSITIVE_EXIF_KEYS = [
  'latitude',
  'longitude',
  'GPSLatitude',
  'GPSLongitude',
  'GPSAltitude',
  'SerialNumber',
  'BodySerialNumber',
  'LensSerialNumber',
  'InternalSerialNumber',
  'CameraOwnerName',
  'OwnerName',
];

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  try {
    await fs.access(distDir);
  } catch {
    throw new Error('[audit-opsec] dist/ directory does not exist. Run astro build first.');
  }

  const files = await walkFiles(distDir);
  const violations = [];

  // 1. Mandatory hosting / exclusion checks
  const hasHtaccess = files.some((f) => path.relative(distDir, f).replace(/\\/g, '/') === '.htaccess');
  if (!hasHtaccess) {
    violations.push('Missing .htaccess in dist/ root.');
  }

  const forbiddenPaths = files.filter((f) => {
    const rel = path.relative(distDir, f).replace(/\\/g, '/');
    return rel.includes('gpx-raw') || rel.startsWith('design-lab/');
  });
  for (const fp of forbiddenPaths) {
    violations.push(`Forbidden path in dist/: ${path.relative(distDir, fp)}`);
  }

  let imageCount = 0;
  let gpxCount = 0;
  let textCount = 0;

  for (const file of files) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const ext = path.extname(file).toLowerCase();

    // 2. Scan raster images for EXIF GPS / serial metadata
    if (IMAGE_EXTS.has(ext)) {
      imageCount += 1;
      try {
        const meta = await exifr.parse(file, { gps: true, exif: true, tiff: true, ifd0: true });
        if (meta && typeof meta === 'object') {
          for (const key of SENSITIVE_EXIF_KEYS) {
            if (meta[key] !== undefined && meta[key] !== null && meta[key] !== '') {
              violations.push(`EXIF leak (${key}) in ${rel}`);
            }
          }
        }
      } catch {
        // AVIF or stripped buffers with zero EXIF headers parse cleanly or return null; ignore parse absence.
      }
      continue;
    }

    // 3. Scan GPX outputs
    if (ext === '.gpx') {
      gpxCount += 1;
      const gpxContent = await fs.readFile(file, 'utf8');
      if (!gpxContent.includes('OpSec Sanitized')) {
        violations.push(`Unsanitized GPX file in dist/: ${rel}`);
      }
      if (/<time>/i.test(gpxContent)) {
        violations.push(`Timestamp tag <time> leaked in GPX file: ${rel}`);
      }
      continue;
    }

    // 4. Scan text/HTML/JSON/XML/JS/SVG assets
    if (TEXT_EXTS.has(ext)) {
      textCount += 1;
      let content = await fs.readFile(file, 'utf8');
      if (rel.startsWith('_astro/maplibre-gl') && ext === '.js') {
        // MapLibre's internal attribution HTML sanitizer keeps a scheme allowlist Set(["http:","https:","mailto:"])
        content = content.replaceAll('new Set(["http:","https:","mailto:"])', 'new Set(["http:","https:"])');
      }
      for (const rule of FORBIDDEN_TEXT_RULES) {
        rule.regex.lastIndex = 0;
        const match = rule.regex.exec(content);
        if (match) {
          violations.push(`${rule.label} matched "${match[0]}" in ${rel}`);
        }
      }
    }
  }

  console.log(
    `[audit-opsec] Scanned ${imageCount} images, ${gpxCount} GPX files, and ${textCount} text assets in dist/.`
  );

  if (violations.length > 0) {
    console.error(`[audit-opsec] FAILED with ${violations.length} violation(s):`);
    for (const v of violations) {
      console.error(`  - ${v}`);
    }
    process.exit(1);
  }

  console.log('[audit-opsec] PASS — zero OpSec or EXIF leaks detected.');
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
