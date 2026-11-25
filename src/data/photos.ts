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
  location: { nl: string; en: string };
}

export const photoEntries: PhotoEntry[] = [
  {
    id: 'macro-hoverfly',
    image: resolvePhoto('macro-hoverfly.jpg'),
    category: 'macro',
    title: { nl: 'Zweefvlieg op ooghoogte', en: 'Hoverfly at Eye Level' },
    caption: {
      nl: 'Recht van voren vastgelegd met minimale scherptediepte op een zonnige reling.',
      en: 'Captured head-on with razor-thin depth of field on a sunlit railing.',
    },
    location: { nl: 'Natuur & Macro', en: 'Nature & Macro' },
  },
  {
    id: 'macro-mushroom-fly',
    image: resolvePhoto('macro-mushroom-fly.jpg'),
    category: 'macro',
    title: { nl: 'Herfstpaddenstoel & bosvlieg', en: 'Autumn Mushroom & Woodland Fly' },
    caption: {
      nl: 'Tijdens een herfstwandeling in het bos — eikenbladeren, mos en een kleine bezoeker op de hoed.',
      en: 'Spotted during an autumn mushroom walk — oak leaves, moss, and a tiny visitor on the cap.',
    },
    location: { nl: 'Herfstwandeling, België', en: 'Autumn Walk, Belgium' },
  },
  {
    id: 'macro-woodland-cluster',
    image: resolvePhoto('macro-woodland-cluster.jpg'),
    category: 'macro',
    title: { nl: 'Zwammen op bemoste stam', en: 'Woodland Mushroom Cluster' },
    caption: {
      nl: 'Gelaagde zwammen tegen een bemoste boomvoet in zacht gefilterd boslicht.',
      en: 'Layered woodland fungi growing from mossy bark in soft filtered forest light.',
    },
    location: { nl: 'Belgisch bos', en: 'Belgian Woodland' },
  },
  {
    id: 'hornet-action',
    image: resolvePhoto('hornet-action.jpg'),
    category: 'road',
    title: { nl: 'Gele Honda CB750 Hornet in actie', en: 'Yellow Honda CB750 Hornet in Motion' },
    caption: {
      nl: 'Panningshot op snelheid met mijn gele CB750 Hornet.',
      en: 'Panning action shot at speed on my yellow CB750 Hornet.',
    },
    location: { nl: 'Onderweg · CB750 Hornet', en: 'On the Road · CB750 Hornet' },
  },
  {
    id: 'hornet-cobblestones',
    image: resolvePhoto('hornet-cobblestones.jpg'),
    category: 'road',
    title: { nl: 'Hornet & klassieke Honda bij avondlicht', en: 'Hornet & Classic Honda at Blue Hour' },
    caption: {
      nl: 'Modern naast klassiek op een historisch kasseiplein na een avondrit.',
      en: 'Modern meets classic on historic cobblestones after an evening ride.',
    },
    location: { nl: 'Avondrit · Vlaanderen', en: 'Evening Ride · Flanders' },
  },
  {
    id: 'moto-golden-hour',
    image: resolvePhoto('moto-golden-hour.jpg'),
    category: 'road',
    title: { nl: 'Even uitblazen bij avondzon', en: 'Golden-Hour Roadside Pause' },
    caption: {
      nl: 'Korte pauze naast het asfalt terwijl de zon laag boven de velden zakt.',
      en: 'A quiet pause beside the road as the sun drops low across the fields.',
    },
    location: { nl: 'Binnendoorrit', en: 'Backroad Loop' },
  },
  {
    id: 'travel-dubrovnik',
    image: resolvePhoto('travel-dubrovnik.jpg'),
    category: 'travel',
    title: { nl: 'Dubrovnik bij nacht', en: 'Dubrovnik Harbor at Night' },
    caption: {
      nl: 'De verlichte stadsmuren en de rustige weerspiegeling in de Adriatische haven.',
      en: 'Illuminated medieval city walls reflecting across the quiet Adriatic harbor.',
    },
    location: { nl: 'Dubrovnik, Kroatië', en: 'Dubrovnik, Croatia' },
  },
  {
    id: 'travel-london',
    image: resolvePhoto('travel-london.jpg'),
    category: 'travel',
    title: { nl: 'Old Billingsgate Market · Londen', en: 'Old Billingsgate Market · London' },
    caption: {
      nl: 'De gevel langs de Theems net na zonsondergang tijdens het blauwe uur.',
      en: 'The historic riverside facade along the Thames right after sunset.',
    },
    location: { nl: 'Londen, VK', en: 'London, UK' },
  },
  {
    id: 'travel-aachen',
    image: resolvePhoto('travel-aachen.jpg'),
    category: 'travel',
    title: { nl: 'Gotiek van het stadhuis in Aken', en: 'Gothic Facade of Aachen Rathaus' },
    caption: {
      nl: 'Steenwerk, spitsbogen en torendetails tijdens een winteruitstap naar Aken.',
      en: 'Stonework, pointed arches, and tower details during a winter trip to Aachen.',
    },
    location: { nl: 'Aken, Duitsland', en: 'Aachen, Germany' },
  },
  {
    id: 'maker-pcb',
    image: resolvePhoto('maker-pcb.jpg'),
    category: 'maker',
    title: { nl: 'Eigen ESP32 & L298N printplaat', en: 'Custom ESP32 & L298N PCB' },
    caption: {
      nl: 'Zelf ontworpen matzwarte printplaat met 12V–5V omvormer, ESP32-voetprint en motordriver.',
      en: 'Custom matte-black circuit board combining a 12V–5V converter, ESP32 footprint, and motor driver.',
    },
    location: { nl: 'Eigen PCB-ontwerp', en: 'Custom PCB Design' },
  },
  {
    id: 'maker-gearmotor',
    image: resolvePhoto('maker-gearmotor.jpg'),
    category: 'maker',
    title: { nl: 'Tandwielkast & DC-motor op de werkbank', en: 'Geared DC Motor Assembly' },
    caption: {
      nl: 'Mechanische aandrijving en testopstelling tijdens een robotica- en elektronicaproject.',
      en: 'Mechanical gear train and drive setup built for a robotics and electronics lab.',
    },
    location: { nl: 'Elektronica & Robotica', en: 'Electronics & Robotics' },
  },
];
