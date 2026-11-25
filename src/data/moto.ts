export const motoProfile = {
  handle: '@QuintenMoto',
  bike: 'Honda CB750 Hornet (~35.000 km)',
  navigationApps: ['Kurviger', 'Calimoto', 'Waze'],
  regions: {
    nl: ['Vlaamse & Waalse Ardennen', 'Duitse Eifel (Trier – Nürburg)', 'Spa-Francorchamps Bikers’Festival'],
    en: ['Belgian Ardennes', 'German Eifel (Trier – Nürburg)', 'Spa-Francorchamps Bikers’Festival'],
  },
  cameraRig: [
    {
      name: 'DJI Osmo Action',
      role: { nl: 'Primaire 4K60 actiecamera', en: 'Primary 4K60 action camera' },
    },
    {
      name: 'Officiële DJI ND-filterset',
      role: { nl: 'Natuurlijke motion blur bij fel zonlicht', en: 'Natural shutter motion blur in bright sun' },
    },
    {
      name: 'Magnetische helm- & stuurmounts',
      role: { nl: 'Snel wisselen tussen POV en chassis-hoek', en: 'Quick swap between helmet POV and bar angles' },
    },
    {
      name: 'DJI Mic Mini (1 TX + 1 RX)',
      role: { nl: 'Heldere stemopname en gecontroleerd motorgeluid in helm/bagage', en: 'Clean voice commentary & balanced exhaust audio' },
    },
  ],
};

export const featuredVideos = [
  {
    id: 'trier-nurburg-uncut',
    // Vervang in CONTENT-TODO.md door je exacte 11-teken YouTube video ID:
    youtubeId: 'dQw4w9WgXcQ',
    isPlaceholder: true,
    title: {
      nl: 'Trier → Nürburg (UNCUT) · Bochtenwerk in de Eifel',
      en: 'Trier → Nürburg (UNCUT) · Eifel Backroad Flow',
    },
    meta: 'Honda CB750 Hornet · DJI Osmo Action + ND16 · DJI Mic Mini',
    notes: {
      nl: 'Pure ritregistratie over technische Eifel-binnendoorwegen, gepland met Kurviger en opgenomen met gebalanceerde ND-sluitertijd.',
      en: 'Uncut ride through technical Eifel twisties planned with Kurviger and captured with calibrated ND motion blur.',
    },
  },
  {
    id: 'spa-bikers-festival-2025',
    youtubeId: 'M7lc1UVf-VE',
    isPlaceholder: true,
    title: {
      nl: 'Spa-Francorchamps Bikers’Festival · 6 Testritten op 1 Dag',
      en: 'Spa-Francorchamps Bikers’Festival · 6 Test Rides in One Day',
    },
    meta: '16 augustus 2025 · Circuit-regio Spa · Vergelijkende indrukken',
    notes: {
      nl: 'Van dikke adventure-twins tot wendbare allrounders: zes opeenvolgende proefritten vergeleken rond mijn eigen CB750 Hornet als referentie.',
      en: 'Comparing six completely different chassis and engine characters back-to-back with the CB750 Hornet as baseline.',
    },
  },
];

export const spaTestRides = [
  {
    bike: 'Honda CRF1100L Africa Twin',
    category: 'Adventure Twin',
    impression: {
      nl: 'Imposant koppel en ontspannen rechtop-ergonomie; moeiteloos over slecht asfalt.',
      en: 'Commanding low-end torque and upright poise over rough tarmac.',
    },
  },
  {
    bike: 'Honda XL750 Transalp',
    category: 'Midweight Adventure',
    impression: {
      nl: 'Dezelfde 755cc-familiegenen als mijn Hornet, verpakt in een lichte, speelse reismachine.',
      en: 'Familiar 755cc parallel-twin punch translated into an agile travel chassis.',
    },
  },
  {
    bike: 'Yamaha Tracer 9 GT',
    category: 'Sport Tourer',
    impression: {
      nl: 'Scherp driecilinderkarakter met sterke windbescherming voor lange Eifel-dagtrips.',
      en: 'Crisp triple-cylinder delivery paired with long-distance touring wind protection.',
    },
  },
  {
    bike: 'CF MOTO 800MT Explore',
    category: 'Tech Adventure',
    impression: {
      nl: 'Rijk uitgerust dashboard en stabiel bochtengedrag voor dit prijssegment.',
      en: 'Feature-dense instrumentation and composed corner stability.',
    },
  },
  {
    bike: 'Honda NC750X DCT',
    category: 'DCT Commuter / Tour',
    impression: {
      nl: 'Verbazend vloeiende dubbele koppeling en laag zwaartepunt; ideaal als rationele kilometervreter.',
      en: 'Remarkably smooth dual-clutch shifts and ultra-low center of gravity.',
    },
  },
  {
    bike: 'Benelli Imperiale 400',
    category: 'Classic Single',
    impression: {
      nl: 'Pure nostalgie en onthaasten: bewijst dat rijplezier niet alleen in pk’s zit.',
      en: 'Unfiltered mechanical simplicity proving that riding joy is never just about horsepower.',
    },
  },
];
