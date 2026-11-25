#!/usr/bin/env node
/**
 * OpSec GPX Sanitizer
 * Reads source GPX files from src/data/gpx-raw/, trims the first and last 5.0 km
 * to avoid revealing start/end locations near home, strips timestamps/author metadata,
 * and outputs sanitized .gpx + .meta.json files into public/gpx/.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const TRIM_KM = 5.0;
const MIN_RAW_KM = 12.0;
const MIN_REMAINING_POINTS = 10;

const rootDir = process.cwd();
const rawDir = path.join(rootDir, 'src', 'data', 'gpx-raw');
const outDir = path.join(rootDir, 'public', 'gpx');

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parsePoints(xml) {
  const pts = [];
  const regex = /<trkpt\b([^>]*?)(?:\/>|>([\s\S]*?)<\/trkpt>)/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const attrs = match[1] || '';
    const inner = match[2] || '';
    const latMatch = /lat\s*=\s*["']([^"']+)["']/i.exec(attrs);
    const lonMatch = /lon\s*=\s*["']([^"']+)["']/i.exec(attrs);
    if (!latMatch || !lonMatch) continue;
    const lat = Number.parseFloat(latMatch[1]);
    const lon = Number.parseFloat(lonMatch[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    const eleMatch = /<ele>\s*([^<\s]+)\s*<\/ele>/i.exec(inner);
    const ele = eleMatch ? Number.parseFloat(eleMatch[1]) : null;
    pts.push({ lat, lon, ele: Number.isFinite(ele) ? ele : null });
  }
  return pts;
}

function extractTrackName(xml, fallbackSlug) {
  const nameMatch = /<trk>[\s\S]*?<name>\s*([^<]+?)\s*<\/name>/i.exec(xml)
    || /<name>\s*([^<]+?)\s*<\/name>/i.exec(xml);
  return nameMatch ? nameMatch[1].trim() : fallbackSlug;
}

function sanitizeXmlText(text) {
  return text.replace(/[<>&"']/g, (ch) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  }[ch]));
}

async function main() {
  await fs.mkdir(rawDir, { recursive: true });
  await fs.mkdir(outDir, { recursive: true });

  const rawEntries = (await fs.readdir(rawDir)).filter((f) => f.toLowerCase().endsWith('.gpx'));
  if (rawEntries.length === 0) {
    console.log('[sanitize-gpx] No source .gpx files found in src/data/gpx-raw/. Skipping.');
    return;
  }

  for (const filename of rawEntries) {
    const slug = filename.replace(/\.gpx$/i, '');
    const rawPath = path.join(rawDir, filename);
    const xml = await fs.readFile(rawPath, 'utf8');
    const rawPts = parsePoints(xml);

    if (rawPts.length < 20) {
      throw new Error(`[sanitize-gpx] "${filename}" contains too few trackpoints (${rawPts.length}).`);
    }

    const cumulative = [0];
    for (let i = 1; i < rawPts.length; i += 1) {
      cumulative.push(
        cumulative[i - 1] + haversineKm(rawPts[i - 1].lat, rawPts[i - 1].lon, rawPts[i].lat, rawPts[i].lon)
      );
    }

    const totalRawKm = cumulative[cumulative.length - 1];
    if (totalRawKm < MIN_RAW_KM) {
      throw new Error(
        `[sanitize-gpx] "${filename}" is too short (${totalRawKm.toFixed(2)} km < ${MIN_RAW_KM} km) to safely trim +/- ${TRIM_KM} km.`
      );
    }

    const trimmed = [];
    for (let i = 0; i < rawPts.length; i += 1) {
      const distFromStart = cumulative[i];
      const distToEnd = totalRawKm - cumulative[i];
      if (distFromStart >= TRIM_KM && distToEnd >= TRIM_KM) {
        trimmed.push({
          lat: Number(rawPts[i].lat.toFixed(5)),
          lon: Number(rawPts[i].lon.toFixed(5)),
          ele: rawPts[i].ele !== null ? Math.round(rawPts[i].ele) : null,
        });
      }
    }

    if (trimmed.length < MIN_REMAINING_POINTS) {
      throw new Error(`[sanitize-gpx] "${filename}" left too few points (${trimmed.length}) after 5 km trim.`);
    }

    let sanitizedKm = 0;
    let elevationGainM = 0;
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLon = Infinity;
    let maxLon = -Infinity;

    for (let i = 0; i < trimmed.length; i += 1) {
      const p = trimmed[i];
      if (p.lat < minLat) minLat = p.lat;
      if (p.lat > maxLat) maxLat = p.lat;
      if (p.lon < minLon) minLon = p.lon;
      if (p.lon > maxLon) maxLon = p.lon;
      if (i > 0) {
        const prev = trimmed[i - 1];
        sanitizedKm += haversineKm(prev.lat, prev.lon, p.lat, p.lon);
        if (p.ele !== null && prev.ele !== null && p.ele > prev.ele) {
          elevationGainM += p.ele - prev.ele;
        }
      }
    }

    const trackName = sanitizeXmlText(extractTrackName(xml, slug));
    const trkptsXml = trimmed
      .map((p) =>
        p.ele !== null
          ? `      <trkpt lat="${p.lat}" lon="${p.lon}"><ele>${p.ele}</ele></trkpt>`
          : `      <trkpt lat="${p.lat}" lon="${p.lon}" />`
      )
      .join('\n');

    const cleanGpx = `<?xml version="1.0" encoding="UTF-8"?>
<!-- OpSec Sanitized: +/-5km trimmed, timestamps stripped -->
<gpx version="1.1" creator="portfolio-quinten sanitize-gpx" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${trackName}</name>
  </metadata>
  <trk>
    <name>${trackName}</name>
    <trkseg>
${trkptsXml}
    </trkseg>
  </trk>
</gpx>
`;

    // Sample up to 36 elevation points for lightweight client sparkline
    const step = Math.max(1, Math.floor(trimmed.length / 36));
    const elevationSample = [];
    for (let i = 0; i < trimmed.length; i += step) {
      if (trimmed[i].ele !== null) elevationSample.push(trimmed[i].ele);
    }

    const meta = {
      slug,
      name: extractTrackName(xml, slug),
      trimKmEachEnd: TRIM_KM,
      totalRawKm: Number(totalRawKm.toFixed(1)),
      sanitizedKm: Number(sanitizedKm.toFixed(1)),
      elevationGainM: Math.round(elevationGainM),
      pointsCount: trimmed.length,
      bbox: [
        [Number(minLon.toFixed(5)), Number(minLat.toFixed(5))],
        [Number(maxLon.toFixed(5)), Number(maxLat.toFixed(5))],
      ],
      center: [
        Number(((minLon + maxLon) / 2).toFixed(5)),
        Number(((minLat + maxLat) / 2).toFixed(5)),
      ],
      elevationSample,
    };

    await fs.writeFile(path.join(outDir, `${slug}.gpx`), cleanGpx, 'utf8');
    await fs.writeFile(path.join(outDir, `${slug}.meta.json`), JSON.stringify(meta, null, 2) + '\n', 'utf8');
    console.log(
      `[sanitize-gpx] ${filename}: ${totalRawKm.toFixed(1)} km -> ${sanitizedKm.toFixed(1)} km (${trimmed.length} pts, +${Math.round(elevationGainM)}m)`
    );
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
