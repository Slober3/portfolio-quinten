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
      role: { nl: 'Natuurlijke bewegingsonscherpte bij zonnige ritten', en: 'Natural motion blur on bright sunny rides' },
    },
    {
      name: 'Magnetische helm- & stuurmounts',
      role: { nl: 'Snel wisselen tussen POV en chassis-hoek', en: 'Quick swap between helmet POV and chassis angles' },
    },
    {
      name: 'DJI Mic Mini (1 TX + 1 RX)',
      role: { nl: 'Heldere stem in de helm en gebalanceerd motorgeluid', en: 'Clear helmet commentary and balanced exhaust sound' },
    },
  ],
};

export interface FeaturedMotoVideo {
  id: string;
  youtubeId: string;
  duration: string;
  title: { nl: string; en: string };
  meta: string;
  notes: { nl: string; en: string };
}

export const featuredVideos: FeaturedMotoVideo[] = [
  {
    id: 'spa-bikers-festival-2025',
    youtubeId: '3sscQbBoyQ0',
    duration: '10:28',
    title: {
      nl: 'Spa-Francorchamps on Two Wheels — Bikers’ Festival 2025',
      en: 'Spa-Francorchamps on Two Wheels — Bikers’ Festival 2025',
    },
    meta: '16 augustus 2025 · 10:28 · Spa-Francorchamps',
    notes: {
      nl: 'Sfeerverslag van het Bikers’ Festival op en rond het circuit van Spa-Francorchamps, met verschillende testritten op één dag.',
      en: 'Highlights from the Bikers’ Festival at Spa-Francorchamps, packed with back-to-back test rides in a single day.',
    },
  },
  {
    id: 'trier-nurburg-uncut',
    youtubeId: 'JhTIEqah9Qg',
    duration: '4:05:57',
    title: {
      nl: 'Trier – Nürburg 2025 (UNCUT)',
      en: 'Trier – Nürburg 2025 (UNCUT)',
    },
    meta: 'Duitse Eifel · 4:05:57 · Volledige rit zonder knipwerk',
    notes: {
      nl: 'Ruim vier uur aan onversneden bochtenwerk dwars door de Eifel, van Trier tot aan de Nürburgring.',
      en: 'Over four hours of uncut backroad riding through the German Eifel, from Trier all the way to the Nürburgring.',
    },
  },
  {
    id: 'honda-transalp-test-ride',
    youtubeId: 'gXJP4K8nc58',
    duration: '21:12',
    title: {
      nl: 'Honda XL750 Transalp Test Ride @ Spa-Francorchamps',
      en: 'Honda XL750 Transalp Test Ride @ Spa-Francorchamps',
    },
    meta: 'Bikers’ Festival · 21:12 · Testrit',
    notes: {
      nl: 'Eerste indrukken van de XL750 Transalp met hetzelfde 755cc-blok als mijn eigen CB750 Hornet, maar in een lichte adventure-verpakking.',
      en: 'First impressions of the XL750 Transalp sharing the same 755cc engine family as my CB750 Hornet in a nimble adventure package.',
    },
  },
  {
    id: 'africa-twin-1100-test-ride',
    youtubeId: 'GbLCpFKj8Sg',
    duration: '19:15',
    title: {
      nl: 'Honda Africa Twin 1100 Test Ride @ Spa-Francorchamps',
      en: 'Honda Africa Twin 1100 Test Ride @ Spa-Francorchamps',
    },
    meta: 'Bikers’ Festival · 19:15 · Testrit',
    notes: {
      nl: 'Op pad met de CRF1100L Africa Twin rond Spa: indrukwekkend koppel, ontspannen zithouding en verrassend wendbaar.',
      en: 'Taking the CRF1100L Africa Twin out around Spa: effortless torque, commanding posture, and surprising agility.',
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
