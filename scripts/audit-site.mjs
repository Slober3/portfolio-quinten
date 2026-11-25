#!/usr/bin/env node
/**
 * Comprehensive Static Site Quality Audit (runs against dist/)
 * Checks:
 *  1. Internal link & asset integrity (zero broken href/src across all pages)
 *  2. Bilingual SEO & hreflang integrity (nl-BE, en, x-default; never bare "be")
 *  3. HTML lang, canonical, <title>, <meta description>, single <h1>, skip-link, img[alt]
 *  4. Valid JSON-LD parsing, schema coverage, zero double-escaped HTML entities, zero PII keys
 *  5. Zero unfilled placeholders or internal developer/OpSec jargon in visible page copy
 *  6. Sitemap presence & performance budget stats
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

const FORBIDDEN_PUBLIC_COPY = [
  { label: 'Placeholder label', regex: /\bplaceholder\b/i },
  { label: 'Demo ID badge', regex: /\bDemo ID\b/i },
  { label: 'Demo-track label', regex: /\bDemo[- ]track\b/i },
  { label: 'Unfilled portrait slot', regex: /Portret-slot|Portrait slot/i },
  { label: 'Unfilled showreel slot', regex: /Showreel-slot|Showreel slot/i },
  { label: 'Internal CONTENT-TODO reference', regex: /CONTENT-TODO/i },
  { label: 'Internal .env reference', regex: /(?<![a-z0-9])\.env\b/i },
  { label: 'Internal OpSec meta-jargon', regex: /\bOpSec\b/i },
  { label: 'Developer library name in copy (PhotoSwipe)', regex: /\bPhotoSwipe\b/i },
  { label: 'Developer library name in copy (MapLibre)', regex: /\bMapLibre\b/i },
  { label: 'Developer form provider in copy', regex: /\b(Web3Forms|Formspree)\b/i },
  { label: 'Developer MDX label in copy', regex: /\bMDX (ARTIKELEN|NOTES)\b/i },
  { label: 'Sharp pipeline jargon in copy', regex: /Sharp-pijplijn|Sharp pipeline|keepIccProfile|EXIF GPS STRIPPED/i },
  { label: 'Fake YouTube placeholder ID', regex: /dQw4w9WgXcQ|M7lc1UVf-VE/ },
];

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkFiles(full)));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function resolveDistTarget(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return null;
  const rel = clean.replace(/^\/+/, '');
  return [
    path.join(distDir, rel),
    path.join(distDir, rel, 'index.html'),
    path.join(distDir, `${rel}.html`),
  ];
}

async function existsFile(filePath) {
  try {
    const st = await fs.stat(filePath);
    return st.isFile();
  } catch {
    return false;
  }
}

function extractVisibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

async function main() {
  const files = await walkFiles(distDir);
  const htmlFiles = files.filter((f) => f.endsWith('.html'));
  const errors = [];
  const warnings = [];
  const jsonLdTypes = new Set();

  // Check sitemaps & robots
  if (!(await existsFile(path.join(distDir, 'sitemap-index.xml')))) {
    errors.push('Missing dist/sitemap-index.xml');
  }
  if (!(await existsFile(path.join(distDir, 'robots.txt')))) {
    errors.push('Missing dist/robots.txt');
  }

  let checkedLinks = 0;
  let checkedJsonLd = 0;
  let totalHtmlBytes = 0;

  for (const file of htmlFiles) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const html = await fs.readFile(file, 'utf8');
    totalHtmlBytes += Buffer.byteLength(html, 'utf8');

    const isRootRedirect = rel === 'index.html';
    const is404 = rel.endsWith('404.html') || rel.includes('/404/');

    // 1. Check internal href & src attributes
    const attrRegex = /\b(?:href|src)="(\/[^"]*)"/g;
    let match;
    while ((match = attrRegex.exec(html)) !== null) {
      const target = match[1];
      if (target.startsWith('//')) continue;
      checkedLinks += 1;
      const candidates = resolveDistTarget(target);
      if (!candidates) continue;
      let ok = false;
      for (const c of candidates) {
        if (await existsFile(c)) {
          ok = true;
          break;
        }
      }
      if (!ok) {
        errors.push(`Broken internal reference "${target}" in ${rel}`);
      }
    }

    if (isRootRedirect) continue;

    // 2. HTML lang, title, meta description, skip-link, H1 count, img alt
    const expectedLang = rel.startsWith('en/') ? 'en' : 'nl-BE';
    if (!html.includes(`lang="${expectedLang}"`)) {
      errors.push(`Expected lang="${expectedLang}" in ${rel}`);
    }
    if (!/<title>[^<]+<\/title>/i.test(html)) {
      errors.push(`Missing <title> in ${rel}`);
    }
    if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) {
      errors.push(`Missing meta description in ${rel}`);
    }
    if (!html.includes('href="#main-content"')) {
      errors.push(`Missing skip-to-content link in ${rel}`);
    }

    const h1Matches = html.match(/<h1\b/gi) || [];
    if (h1Matches.length !== 1) {
      errors.push(`Expected exactly 1 <h1> (found ${h1Matches.length}) in ${rel}`);
    }

    const imgRegex = /<img\b[^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      if (!/\balt="/i.test(imgMatch[0])) {
        errors.push(`<img> missing alt attribute in ${rel}`);
      }
    }

    // 3. SEO canonical & hreflang checks (indexable pages)
    if (!is404) {
      if (!/<link\s+rel="canonical"\s+href="https?:\/\/[^"]+"/i.test(html)) {
        errors.push(`Missing canonical link in ${rel}`);
      }
      if (!html.includes('hreflang="nl-BE"')) {
        errors.push(`Missing hreflang="nl-BE" in ${rel}`);
      }
      if (!html.includes('hreflang="en"')) {
        errors.push(`Missing hreflang="en" in ${rel}`);
      }
      if (!html.includes('hreflang="x-default"')) {
        errors.push(`Missing hreflang="x-default" in ${rel}`);
      }
      if (/hreflang="be"/i.test(html)) {
        errors.push(`Invalid hreflang="be" (Belarusian!) found in ${rel}`);
      }
    }

    // 4. JSON-LD validation
    const ldRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let ldMatch;
    while ((ldMatch = ldRegex.exec(html)) !== null) {
      checkedJsonLd += 1;
      const rawJson = ldMatch[1];
      if (rawJson.includes('&amp;amp;')) {
        errors.push(`Double-escaped HTML entity in JSON-LD in ${rel}`);
      }
      try {
        const parsed = JSON.parse(rawJson);
        const collectTypes = (obj) => {
          if (!obj || typeof obj !== 'object') return;
          if (Array.isArray(obj)) {
            obj.forEach(collectTypes);
            return;
          }
          if (typeof obj['@type'] === 'string') jsonLdTypes.add(obj['@type']);
          for (const forbidden of ['email', 'telephone', 'birthDate']) {
            if (forbidden in obj) {
              errors.push(`Forbidden PII key "${forbidden}" inside JSON-LD in ${rel}`);
            }
          }
          Object.values(obj).forEach(collectTypes);
        };
        collectTypes(parsed);
      } catch (e) {
        errors.push(`Invalid JSON-LD syntax in ${rel}: ${e.message}`);
      }
    }

    // 5. Public copy quality gate (zero unfilled placeholders or internal jargon)
    const visibleText = extractVisibleText(html);
    for (const rule of FORBIDDEN_PUBLIC_COPY) {
      if (rule.regex.test(visibleText)) {
        errors.push(`Unwanted public copy (${rule.label}) detected in ${rel}`);
      }
    }
  }

  // Verify key expected schemas exist
  for (const requiredType of ['ProfilePage', 'Person', 'Book', 'VideoObject', 'BlogPosting', 'CreativeWork', 'BreadcrumbList']) {
    if (!jsonLdTypes.has(requiredType)) {
      warnings.push(`Expected JSON-LD schema "@type": "${requiredType}" not found across site`);
    }
  }

  const avgHtmlKb = (totalHtmlBytes / Math.max(1, htmlFiles.length) / 1024).toFixed(1);
  console.log(
    `[audit-site] Checked ${htmlFiles.length} HTML pages (avg ${avgHtmlKb} KB), ${checkedLinks} internal references, and ${checkedJsonLd} JSON-LD blocks.`
  );
  console.log(`[audit-site] JSON-LD schemas verified: ${Array.from(jsonLdTypes).sort().join(', ')}`);

  if (warnings.length > 0) {
    console.warn(`[audit-site] ${warnings.length} warning(s):`);
    warnings.forEach((w) => console.warn(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.error(`[audit-site] FAILED with ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log('[audit-site] PASS — zero broken links, valid hreflang/WCAG/JSON-LD, and zero placeholder/jargon leaks.');
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
