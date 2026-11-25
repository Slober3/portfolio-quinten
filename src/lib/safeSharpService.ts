import sharp from 'sharp';
import { baseService } from 'astro/assets';
import type { LocalImageService } from 'astro';

const fitMap = {
  fill: 'fill',
  contain: 'inside',
  cover: 'cover',
  none: 'outside',
  'scale-down': 'inside',
  outside: 'outside',
  inside: 'inside',
} as const;

const qualityMap: Record<string, number> = {
  low: 45,
  mid: 65,
  high: 82,
  max: 95,
};

function resolveQuality(quality: string | number | undefined, fallback: number): number {
  if (typeof quality === 'number') return quality;
  if (typeof quality === 'string' && quality in qualityMap) return qualityMap[quality];
  return fallback;
}

/**
 * Custom Sharp image service that always strips sensitive EXIF metadata
 * (GPS coordinates, camera serial numbers, timestamps) while keeping
 * orientation (.rotate()) and color fidelity (.keepIccProfile()).
 */
const safeSharpService: LocalImageService = {
  ...baseService,
  async transform(inputBuffer, transformOptions) {
    sharp.cache(false);

    const pipeline = sharp(inputBuffer, { failOnError: false, pages: -1 })
      .rotate()
      .keepIccProfile();

    const width = typeof transformOptions.width === 'number' ? Math.round(transformOptions.width) : undefined;
    const height = typeof transformOptions.height === 'number' ? Math.round(transformOptions.height) : undefined;

    if (width || height) {
      const fitKey = typeof transformOptions.fit === 'string' ? transformOptions.fit : 'cover';
      pipeline.resize({
        width,
        height,
        fit: fitMap[fitKey as keyof typeof fitMap] ?? 'cover',
        withoutEnlargement: true,
      });
    }

    const format = typeof transformOptions.format === 'string' ? transformOptions.format : 'webp';

    if (format === 'avif') {
      pipeline.avif({ quality: resolveQuality(transformOptions.quality, 76), effort: 4 });
    } else if (format === 'png') {
      pipeline.png({ compressionLevel: 8 });
    } else if (format === 'jpeg' || format === 'jpg') {
      pipeline.jpeg({ quality: resolveQuality(transformOptions.quality, 82), mozjpeg: true });
    } else {
      pipeline.webp({ quality: resolveQuality(transformOptions.quality, 82) });
    }

    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
    const outBytes = new Uint8Array(data);
    return {
      data: outBytes,
      format: info.format,
    };
  },
};

export default safeSharpService;
