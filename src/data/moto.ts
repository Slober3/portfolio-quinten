export const motoProfile = {
  handle: '@QuintenMoto',
  channelUrl: 'https://www.youtube.com/@QuintenMoto/videos',
  bike: 'Honda CB750 Hornet (~35.000 km)',
  navigationApps: ['Kurviger', 'Calimoto', 'Waze'],
  regions: {
    nl: ['Vlaamse & Waalse Ardennen', 'Duitse Eifel (Trier – Nürburg)', 'Spa-Francorchamps Bikers’Festival'],
    en: ['Belgian Ardennes', 'German Eifel (Trier – Nürburg)', 'Spa-Francorchamps Bikers’Festival'],
  },
  cameraRig: [
    {
      name: 'DJI Osmo Action',
      role: { nl: 'Hoofdcamera in 4K60 voor helm- en stuurshots', en: 'Primary 4K60 camera for helmet and bar angles' },
    },
    {
      name: 'Officiële DJI ND-filterset',
      role: { nl: 'Rustige bewegingsonscherpte op zonnige ritten', en: 'Natural motion blur on bright sunny rides' },
    },
    {
      name: 'Magnetische helm- & stuurmounts',
      role: { nl: 'Snel wisselen tussen POV en chassis-perspectief', en: 'Quick swap between helmet POV and chassis angles' },
    },
    {
      name: 'DJI Mic Mini (1 TX + 1 RX)',
      role: { nl: 'Heldere stem in de helm en gebalanceerd motorgeluid', en: 'Clear helmet commentary and balanced exhaust sound' },
    },
  ],
};

export interface FeaturedMotoVideo {
  id: string;
  /** Optioneel: vul een 11-teken YouTube video-ID in om direct op de pagina af te spelen. */
  youtubeId?: string;
  channelUrl: string;
  photoKind: 'hornet' | 'spa';
  title: { nl: string; en: string };
  meta: string;
  notes: { nl: string; en: string };
}

export const featuredVideos: FeaturedMotoVideo[] = [
  {
    id: 'trier-nurburg-uncut',
    youtubeId: '',
    channelUrl: 'https://www.youtube.com/@QuintenMoto/videos',
    photoKind: 'hornet',
    title: {
      nl: 'Trier → Nürburg (UNCUT) · Bochtenwerk in de Eifel',
      en: 'Trier → Nürburg (UNCUT) · Eifel Backroad Flow',
    },
    meta: 'Honda CB750 Hornet · DJI Osmo Action + ND-filter · DJI Mic Mini',
    notes: {
      nl: 'Een onversneden rit langs technische binnendoorwegen door de Eifel, uitgezet met Kurviger en vastgelegd met natuurlijk motorgeluid.',
      en: 'An uncut ride along technical Eifel backroads planned with Kurviger and captured with clean engine audio.',
    },
  },
  {
    id: 'spa-bikers-festival-2025',
    youtubeId: '',
    channelUrl: 'https://www.youtube.com/@QuintenMoto/videos',
    photoKind: 'spa',
    title: {
      nl: 'Spa-Francorchamps Bikers’Festival · 6 Testritten op 1 Dag',
      en: 'Spa-Francorchamps Bikers’Festival · 6 Test Rides in One Day',
    },
    meta: '16 augustus 2025 · Regio Spa-Francorchamps · Eerste indrukken',
    notes: {
      nl: 'Van koppelrijke adventure-twins tot wendbare allrounders: zes proefritten na elkaar vergeleken met mijn eigen CB750 Hornet als referentie.',
      en: 'From torquey adventure twins to nimble all-rounders: six back-to-back test rides benchmarked against my own CB750 Hornet.',
    },
  },
];

export const spaTestRides = [
  {
    bike: 'Honda CRF1100L Africa Twin',
    category: 'Adventure Twin',
    impression: {
      nl: 'Imposant koppel en ontspannen rechtop-ergonomie; rolt moeiteloos over minder goed asfalt.',
      en: 'Commanding low-end torque and upright poise over rough tarmac.',
    },
  },
  {
    bike: 'Honda XL750 Transalp',
    category: 'Midweight Adventure',
    impression: {
      nl: 'Dezelfde 755cc-familiegenen als mijn Hornet, maar dan in een lichte, speelse reismachine.',
      en: 'Familiar 755cc parallel-twin punch translated into an agile travel chassis.',
    },
  },
  {
    bike: 'Yamaha Tracer 9 GT',
    category: 'Sport Tourer',
    impression: {
      nl: 'Scherp driecilinderkarakter met sterke windbescherming voor lange dagtrips richting Eifel.',
      en: 'Crisp triple-cylinder delivery paired with long-distance touring wind protection.',
    },
  },
  {
    bike: 'CF MOTO 800MT Explore',
    category: 'Tech Adventure',
    impression: {
      nl: 'Rijk uitgerust dashboard en vertrouwenwekkend bochtengedrag voor dit segment.',
      en: 'Feature-dense instrumentation and composed corner stability for its class.',
    },
  },
  {
    bike: 'Honda NC750X DCT',
    category: 'DCT Commuter / Tour',
    impression: {
      nl: 'Verbazend vloeiende dubbele koppeling en laag zwaartepunt; een erg rationele kilometervreter.',
      en: 'Remarkably smooth dual-clutch shifts and a low center of gravity for effortless miles.',
    },
  },
  {
    bike: 'Benelli Imperiale 400',
    category: 'Classic Single',
    impression: {
      nl: 'Pure nostalgie en onthaasten: het bewijs dat rijplezier echt niet alleen in pk’s zit.',
      en: 'Unfiltered mechanical simplicity proving that riding joy is never just about horsepower.',
    },
  },
];
