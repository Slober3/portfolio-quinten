import type { ImageMetadata } from 'astro';

const photoModules = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', {
  eager: true,
});

function resolvePhoto(filename: string): ImageMetadata {
  const key = `../assets/photos/${filename}`;
  const mod = photoModules[key];
  if (!mod) {
    throw new Error(`Missing photo asset: ${key}`);
  }
  return mod.default;
}

export type PhotoCategory = 'macro' | 'road' | 'travel';

export interface PhotoEntry {
  id: string;
  image: ImageMetadata;
  category: PhotoCategory;
  title: { nl: string; en: string };
  caption: { nl: string; en: string };
  exposure: string;
}

export const photoEntries: PhotoEntry[] = [
  {
    id: 'macro-dew-optics',
    image: resolvePhoto('macro-dew-optics.jpg'),
    category: 'macro',
    title: { nl: 'Ochtenddauw & Macro-optiek', en: 'Morning Dew & Macro Optics' },
    caption: {
      nl: 'Natuur & Macro · Focus op minimale scherptediepte (EXIF GPS/serienummer automatisch gestript).',
      en: 'Nature & Macro · Shallow depth-of-field study (EXIF GPS/serial automatically stripped).',
    },
    exposure: '90mm Macro · f/2.8 · 1/500s · ISO 100',
  },
  {
    id: 'forest-canopy-light',
    image: resolvePhoto('forest-canopy-light.jpg'),
    category: 'macro',
    title: { nl: 'Kempens Licht door Dennen', en: 'Campine Canopy Golden Hour' },
    caption: {
      nl: 'Natuur & Macro · Natuurlijk tegenlicht en rustgevend kleurverloop.',
      en: 'Nature & Macro · Filtered golden-hour canopy light.',
    },
    exposure: '50mm · f/4.0 · 1/320s · ISO 200',
  },
  {
    id: 'hornet-apex-dusk',
    image: resolvePhoto('hornet-apex-dusk.jpg'),
    category: 'road',
    title: { nl: 'Eifel Bochten bij Schemer', en: 'Eifel Hairpins at Dusk' },
    caption: {
      nl: 'On the Road · Nummerplaten en exacte startcoördinaten blijven altijd verborgen.',
      en: 'On the Road · Plates and residential coordinates strictly omitted.',
    },
    exposure: '35mm · f/2.8 · 1/640s · ISO 400',
  },
  {
    id: 'spa-raidillon-mist',
    image: resolvePhoto('spa-raidillon-mist.jpg'),
    category: 'road',
    title: { nl: 'Raidillon · Motorsport Paddock', en: 'Raidillon · Motorsport Paddock' },
    caption: {
      nl: 'On the Road & Motorsport · Vastgelegd rond Spa-Francorchamps Bikers’Festival.',
      en: 'On the Road & Motorsport · Captured around Spa-Francorchamps Bikers’Festival.',
    },
    exposure: '70-200mm · f/4.0 · 1/1000s · ISO 200',
  },
  {
    id: 'adriatic-stone-dubrovnik',
    image: resolvePhoto('adriatic-stone-dubrovnik.jpg'),
    category: 'travel',
    title: { nl: 'Adriatische Steen · Dubrovnik', en: 'Adriatic Stone · Dubrovnik' },
    caption: {
      nl: 'Reizen & Sfeer · Architecturale contrasten en warm avondlicht langs de kust.',
      en: 'Travel & Atmosphere · Architectural stone contrasts under late Adriatic sun.',
    },
    exposure: '24mm · f/5.6 · 1/400s · ISO 100',
  },
  {
    id: 'atlantic-cliffs-portugal',
    image: resolvePhoto('atlantic-cliffs-portugal.jpg'),
    category: 'travel',
    title: { nl: 'Atlantische Klifkust · Portugal', en: 'Atlantic Cliffs · Portugal' },
    caption: {
      nl: 'Reizen & Sfeer · Horizonstudie en kustlijn uit de Shutterstock-reiscollectie.',
      en: 'Travel & Atmosphere · Coastal horizon study from the Shutterstock travel series.',
    },
    exposure: '35mm · f/8.0 · 1/250s · ISO 100',
  },
];
