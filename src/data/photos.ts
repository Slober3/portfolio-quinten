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

export type PhotoCategory = 'macro' | 'road' | 'travel' | 'maker';

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
    title: { nl: 'Herfstpaddenstoel in het mos', en: 'Woodland Mushroom in Damp Moss' },
    caption: {
      nl: 'Stilte op bosbodemhoogte na een regenbui — kleine scherptediepte en zacht herfstlicht.',
      en: 'Quiet at forest-floor level after rain — razor-thin focus plane and soft autumn light.',
    },
    exposure: '90mm Macro · f/2.8 · 1/500s · ISO 100',
  },
  {
    id: 'forest-canopy-light',
    image: resolvePhoto('forest-canopy-light.jpg'),
    category: 'macro',
    title: { nl: 'Veldsprinkhaan op kiezel en mos', en: 'Green Grasshopper on Moss & Gravel' },
    caption: {
      nl: 'Geduld langs een zonnig bospad tot het licht precies op de vleugelstructuur valt.',
      en: 'Patience beside a sunlit woodland trail waiting for the light to catch every wing detail.',
    },
    exposure: '90mm Macro · f/4.0 · 1/320s · ISO 200',
  },
  {
    id: 'hornet-apex-dusk',
    image: resolvePhoto('hornet-apex-dusk.jpg'),
    category: 'road',
    title: { nl: 'Avondlicht in de Eifel', en: 'Golden Hour in the Eifel' },
    caption: {
      nl: 'Een korte stop langs een verlaten bochtenweg na een lange dag sturen over binnendoorwegen.',
      en: 'A quiet roadside pause along empty twisties after a full day of backroad riding.',
    },
    exposure: '35mm · f/2.8 · 1/640s · ISO 400',
  },
  {
    id: 'spa-raidillon-mist',
    image: resolvePhoto('spa-raidillon-mist.jpg'),
    category: 'road',
    title: { nl: 'Ochtendmist in de Ardennen', en: 'Morning Mist in the Ardennes' },
    caption: {
      nl: 'Vroeg op pad richting Spa-Francorchamps wanneer de nevel nog tussen de dennenbomen hangt.',
      en: 'Early start toward Spa-Francorchamps while mist still lingers across the pine ridges.',
    },
    exposure: '70mm · f/4.0 · 1/1000s · ISO 200',
  },
  {
    id: 'adriatic-stone-dubrovnik',
    image: resolvePhoto('adriatic-stone-dubrovnik.jpg'),
    category: 'travel',
    title: { nl: 'Stadsmuren van Dubrovnik', en: 'Stone Ramparts of Dubrovnik' },
    caption: {
      nl: 'Warm avondlicht over kalksteen en terracotta daken met uitzicht op de Adriatische Zee.',
      en: 'Warm late-afternoon sun across limestone walls and terracotta roofs overlooking the Adriatic.',
    },
    exposure: '24mm · f/5.6 · 1/400s · ISO 100',
  },
  {
    id: 'atlantic-cliffs-portugal',
    image: resolvePhoto('atlantic-cliffs-portugal.jpg'),
    category: 'travel',
    title: { nl: 'Kliffen aan de Atlantische kust', en: 'Portuguese Atlantic Cliffs' },
    caption: {
      nl: 'Ruige branding en zandsteen bij zonsondergang tijdens een reis langs de Portugese kust.',
      en: 'Heavy Atlantic swell and sunlit sandstone cliffs during a trip along the Portuguese coast.',
    },
    exposure: '35mm · f/8.0 · 1/250s · ISO 100',
  },
  {
    id: 'pcb-bench-craft',
    image: resolvePhoto('pcb-bench-craft.jpg'),
    category: 'maker',
    title: { nl: 'Eigen printplaat op de werkbank', en: 'Custom PCB on the Workbench' },
    caption: {
      nl: 'Koperbanen, een microcontroller en fijn soldeerwerk voor eigen domotica- en sensorexperimenten.',
      en: 'Gold traces, a microcontroller, and fine bench assembly for custom sensor and home-automation builds.',
    },
    exposure: '50mm · f/2.8 · 1/125s · ISO 400',
  },
  {
    id: 'lasercut-kalimba-lab',
    image: resolvePhoto('lasercut-kalimba-lab.jpg'),
    category: 'maker',
    title: { nl: 'Kalimba, lasercut & tafeltop', en: 'Kalimba, Laser-Cut & Tabletop' },
    caption: {
      nl: 'Houtbewerking, gelaserde spelonderdelen, 3D-geprint terrein en een 17-toets kalimba op één werktafel.',
      en: 'Laser-cut wooden tokens, 3D-printed scenery, and a 17-key kalimba sharing the same craft table.',
    },
    exposure: '35mm · f/3.2 · 1/200s · ISO 250',
  },
];
