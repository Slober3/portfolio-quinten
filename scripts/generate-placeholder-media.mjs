#!/usr/bin/env node
/**
 * Generates synthetic Eifel/Ardennen demo GPX (~44 km so +/- 5km trim leaves ~34 km)
 * and 6 clean high-resolution editorial showcase JPEG photos via Sharp SVG rendering.
 */
import fsp from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const gpxRawDir = path.join(rootDir, 'src', 'data', 'gpx-raw');
const photoDir = path.join(rootDir, 'src', 'assets', 'photos');

async function generateDemoGpx() {
  await fsp.mkdir(gpxRawDir, { recursive: true });
  const pts = [];
  // Winding Eifel / Rursee scenic loop (~44 km) — zero relation to any personal residence
  const startLat = 50.562;
  const startLon = 6.245;
  const count = 320;
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const lat = startLat + 0.145 * t + 0.018 * Math.sin(t * Math.PI * 5);
    const lon = startLon + 0.24 * Math.sin(t * Math.PI * 1.4) + 0.032 * Math.cos(t * Math.PI * 9);
    const ele = 365 + 145 * Math.sin(t * Math.PI * 2.2) + 45 * Math.cos(t * Math.PI * 7);
    const ts = new Date(Date.UTC(2025, 7, 16, 9, 0, i * 18)).toISOString();
    pts.push(
      `      <trkpt lat="${lat.toFixed(6)}" lon="${lon.toFixed(6)}"><ele>${ele.toFixed(1)}</ele><time>${ts}</time></trkpt>`
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Demo Eifel Route Generator" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Eifel &amp; Rursee Bochtenroute (Demo)</name>
    <author><name>MotoAdventures Raw Export</name></author>
  </metadata>
  <trk>
    <name>Eifel &amp; Rursee Bochtenroute</name>
    <trkseg>
${pts.join('\n')}
    </trkseg>
  </trk>
</gpx>
`;
  await fsp.writeFile(path.join(gpxRawDir, 'eifel-ardennen-twisties.gpx'), xml, 'utf8');
  console.log('[generate-media] Wrote demo src/data/gpx-raw/eifel-ardennen-twisties.gpx');
}

const PHOTOS = [
  {
    file: 'macro-dew-optics.jpg',
    bgA: '#0E1C1B',
    bgB: '#163832',
    accent: '#34D399',
    accent2: '#F59E0B',
    label: 'MACRO SERIES · F/2.8',
    title: 'Morning Dew & Micro Optics',
  },
  {
    file: 'forest-canopy-light.jpg',
    bgA: '#131A13',
    bgB: '#263B25',
    accent: '#A3E635',
    accent2: '#38BDF8',
    label: 'NATURE · GOLDEN HOUR',
    title: 'Kempen Pines · Filtered Light',
  },
  {
    file: 'hornet-apex-dusk.jpg',
    bgA: '#18141C',
    bgB: '#2A1D2E',
    accent: '#F59E0B',
    accent2: '#38BDF8',
    label: 'ON THE ROAD · CB750 HORNET',
    title: 'Eifel Hairpins · Dusk Telemetry',
  },
  {
    file: 'spa-raidillon-mist.jpg',
    bgA: '#0E1522',
    bgB: '#1C2E4A',
    accent: '#38BDF8',
    accent2: '#F59E0B',
    label: 'MOTORSPORT · SPA 2025',
    title: 'Raidillon Ascent · Track Paddock',
  },
  {
    file: 'adriatic-stone-dubrovnik.jpg',
    bgA: '#1A1614',
    bgB: '#3A281E',
    accent: '#F59E0B',
    accent2: '#FBBF24',
    label: 'TRAVEL · CROATIA',
    title: 'Adriatic Stone & Late Sun',
  },
  {
    file: 'atlantic-cliffs-portugal.jpg',
    bgA: '#0D1724',
    bgB: '#1B3A57',
    accent: '#38BDF8',
    accent2: '#34D399',
    label: 'TRAVEL · PORTUGAL',
    title: 'Atlantic Cliffs · Horizon Study',
  },
  {
    file: 'pcb-bench-craft.jpg',
    bgA: '#0F151D',
    bgB: '#1B2A38',
    accent: '#34D399',
    accent2: '#38BDF8',
    label: 'MAKER & LAB · HARDWARE',
    title: 'Home+ Custom PCB & Soldering Bench',
  },
  {
    file: 'lasercut-kalimba-lab.jpg',
    bgA: '#191410',
    bgB: '#33261A',
    accent: '#F59E0B',
    accent2: '#34D399',
    label: 'MAKER & LAB · CRAFT',
    title: 'SVG/DXF Laser-Cutting & 3D Prototypes',
  },
];

function escapeXml(str) {
  return str.replace(/[<>&"']/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[ch]));
}

async function generatePlaceholderPhotos() {
  await fsp.mkdir(photoDir, { recursive: true });
  for (const item of PHOTOS) {
    const safeLabel = escapeXml(item.label);
    const safeTitle = escapeXml(item.title);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1067" viewBox="0 0 1600 1067">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${item.bgA}" />
      <stop offset="100%" stop-color="${item.bgB}" />
    </linearGradient>
    <radialGradient id="orb" cx="62%" cy="42%" r="48%">
      <stop offset="0%" stop-color="${item.accent}" stop-opacity="0.35" />
      <stop offset="65%" stop-color="${item.accent2}" stop-opacity="0.1" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1600" height="1067" fill="url(#g)" />
  <rect width="1600" height="1067" fill="url(#orb)" />
  <g stroke="#EDF2F7" stroke-opacity="0.12" stroke-width="1.5">
    <line x1="533" y1="0" x2="533" y2="1067" />
    <line x1="1066" y1="0" x2="1066" y2="1067" />
    <line x1="0" y1="355" x2="1600" y2="355" />
    <line x1="0" y1="711" x2="1600" y2="711" />
  </g>
  <path d="M 120 790 C 340 610, 560 720, 820 530 C 1020 380, 1260 490, 1480 310" fill="none" stroke="${item.accent}" stroke-width="5" stroke-opacity="0.65" />
  <circle cx="800" cy="533" r="170" fill="none" stroke="${item.accent2}" stroke-width="2" stroke-opacity="0.45" />
  <circle cx="800" cy="533" r="18" fill="${item.accent}" fill-opacity="0.8" />
  <rect x="72" y="880" width="680" height="118" rx="14" fill="#0B0E14" fill-opacity="0.72" stroke="#EDF2F7" stroke-opacity="0.18" />
  <text x="104" y="924" fill="${item.accent}" font-family="monospace" font-size="24" font-weight="600">${safeLabel}</text>
  <text x="104" y="968" fill="#EDF2F7" font-family="sans-serif" font-size="34" font-weight="700">${safeTitle}</text>
</svg>`;
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(photoDir, item.file));
  }
  console.log(`[generate-media] Generated ${PHOTOS.length} showcase JPEGs in src/assets/photos/`);
}

await generateDemoGpx();
await generatePlaceholderPhotos();
