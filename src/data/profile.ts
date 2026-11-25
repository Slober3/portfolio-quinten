export const externalLinks = {
  github: 'https://github.com/Slober3',
  youtubeMoto: 'https://www.youtube.com/@QuintenMoto',
  thomasMoreRtc: 'https://thomasmore.be/nl/vormingen/datacommunicatie-en-netwerken',
  pcbWaySvejr: 'https://www.pcbway.com/project/share/Home__Domotica_Svejr_Station.html',
  // Vul deze optionele URL's aan in CONTENT-TODO.md zodra je je publieke profielen wilt koppelen:
  linkedin: '',
  instagram: '',
  shutterstock: '',
};

export const books = [
  {
    title: 'Thoughts on cyber security',
    isbn: '9798651810475',
    pages: 48,
    year: '2020',
    datePublished: '2020-06-07',
    inLanguage: 'nl',
    buyUrl: 'https://www.bol.com/be/nl/p/thoughts-on-cyber-security/9300000004610620/',
    description: {
      nl: 'Praktische en fundamentele inzichten over moderne cybersecurity-dreigingen, preventie en menselijk bewustzijn.',
      en: 'Practical and foundational insights on modern cybersecurity threats, defense hygiene, and human awareness.',
    },
  },
  {
    title: 'Informatica: Programmeren met Python',
    isbn: '9798654331892',
    pages: 38,
    year: '2020',
    datePublished: '2020-06-17',
    inLanguage: 'nl',
    buyUrl: 'https://www.bol.com/be/nl/p/informatica/9300000008283801/',
    description: {
      nl: 'Compact, toegankelijk handboek dat beginnende programmeurs stap voor stap begeleidt van logica naar leesbare Python-code.',
      en: 'Compact handbook guiding beginners step-by-step from algorithmic thinking to clean, readable Python code.',
    },
  },
];

export const timeline = [
  {
    period: '2020 — heden',
    periodEn: '2020 — present',
    role: {
      nl: 'Praktijklector Cloud, Netwerken & Cybersecurity',
      en: 'Senior Lecturer Cloud, Networking & Cybersecurity',
    },
    org: 'Thomas More Hogeschool · IT Factory (Campus Geel)',
    details: {
      nl: 'Docent in de Nederlandstalige (1ITF) en Engelstalige (1ACS) opleidingen Toegepaste Informatica: Cloud & Infrastructure (AWS, Docker, Kubernetes, Linux), Windows SysAdmin (Active Directory, Systems as Code, PowerShell), Cisco CCNA 1 & 2 en IoT/Electronics. Daarnaast ben ik ook actief als coach bij studentenorganisatie SIN.',
      en: 'Teaching in both Dutch (1ITF) and English (1ACS) Applied Computer Science tracks: Cloud & Infrastructure (AWS, Docker, Kubernetes, Linux), Windows SysAdmin (Active Directory, Systems as Code, PowerShell), Cisco CCNA 1 & 2, and IoT/Electronics. I am also involved as a coach at student organization SIN.',
    },
  },
  {
    period: 'Doorlopend',
    periodEn: 'Ongoing',
    role: {
      nl: 'Cisco-labworkshops & Train-the-Trainer',
      en: 'Cisco Lab Workshops & Train-the-Trainer',
    },
    org: 'RTC Antwerpen · Datacommunicatie & Netwerken',
    details: {
      nl: 'Begeleiden van praktijkgerichte Cisco-netwerkworkshops en kennisoverdracht naar collega-leerkrachten in de provincie Antwerpen.',
      en: 'Delivering hands-on Cisco networking labs and Train-the-Trainer sessions for STEM teachers across the Antwerp province.',
    },
  },
  {
    period: '2020',
    periodEn: '2020',
    role: {
      nl: 'Auteur van twee educatieve IT-handboeken',
      en: 'Author of two educational IT handbooks',
    },
    org: 'Zelfstandige publicaties (ISBN 9798651810475 & 9798654331892)',
    details: {
      nl: 'Publicatie van Thoughts on cyber security en Informatica: Programmeren met Python als toegankelijke brug naar het werkveld.',
      en: 'Published Thoughts on cyber security and Informatica: Programmeren met Python to bridge theory and real-world engineering.',
    },
  },
  {
    period: 'Opleiding & Studentenvertegenwoordiging',
    periodEn: 'Education & Governance',
    role: {
      nl: 'Prof. Bachelor Elektronica-ICT & Pedagogisch Getuigschrift Informatica/Techniek',
      en: 'B.Sc. Electronics-ICT & Pedagogical Teaching Certificate',
    },
    org: 'VTI · VVS / VLOR curriculumkwaliteit',
    details: {
      nl: 'Gecombineerde technische basis in Elektronica-ICT met onderwijservaring (o.a. VTI Lier-praktijkervaring) en beleidsmatige inbreng namens de Vlaamse Vereniging van Studenten (VVS) in VLOR-publicaties rond hogeronderwijscurricula.',
      en: 'Combined Electronics-ICT engineering degree with formal teaching pedagogy and Flemish higher-education quality assurance participation via VVS & VLOR.',
    },
  },
];

export const githubHighlights = [
  {
    name: 'PotHead',
    stack: 'PHP · Security Deception',
    url: 'https://github.com/Slober3/PotHead',
    description: {
      nl: 'Modulaire PHP web-honeypot die geautomatiseerde probes en credential-stuffing registreert voor analyse in het onderwijs.',
      en: 'Modular PHP web honeypot capturing automated probes and credential-stuffing payloads for classroom threat analysis.',
    },
  },
  {
    name: 'ESP32-Public-Honeypot',
    stack: 'C++ · ESP32 · IoT',
    url: 'https://github.com/Slober3/ESP32-Public-Honeypot',
    description: {
      nl: 'Lichtgewicht microcontroller-honeypot die ongeoorloofde scanpogingen op IoT-poorten zichtbaar maakt.',
      en: 'Lightweight microcontroller honeypot exposing automated port scanning against simulated IoT endpoints.',
    },
  },
  {
    name: 'BeeHive',
    stack: 'IoT · Embedded Telemetry',
    url: 'https://github.com/Slober3/BeeHive',
    description: {
      nl: 'Open-source IoT-opstelling voor continue omgevingsmeting en telemetrie in een slimme bijenkast.',
      en: 'Open-source IoT telemetry node built for continuous environmental monitoring inside a beehive.',
    },
  },
  {
    name: 'Pester-Test-Examples',
    stack: 'PowerShell · Pester · IaC',
    url: 'https://github.com/Slober3/Pester-Test-Examples',
    description: {
      nl: 'Praktijkvoorbeelden om Windows Server-configuraties, Active Directory en DNS automatisch te verifiëren met Pester.',
      en: 'Hands-on Pester test suites verifying Windows Server roles, Active Directory state, and DNS determinism.',
    },
  },
  {
    name: 'ScraperAfspraakCheckerGemeente',
    stack: 'Python · Selenium · Automation',
    url: 'https://github.com/Slober3/ScraperAfspraakCheckerGemeente',
    description: {
      nl: 'Pragmatisch Python/Selenium-script dat automatisch beschikbare gemeentelijke afspraakslots opvolgt — techniek inzetten tegen dagelijkse frictie.',
      en: 'Pragmatic Python/Selenium automation monitoring municipal appointment availability — applying code to everyday friction.',
    },
  },
  {
    name: 'Home+ Domotica Svejr Station',
    stack: 'Custom PCB · PCBWay',
    url: 'https://www.pcbway.com/project/share/Home__Domotica_Svejr_Station.html',
    description: {
      nl: 'Zelf ontworpen en geproduceerd printplaat-project voor modulaire thuisautomatisering en sensormetingen.',
      en: 'Custom-designed and fabricated PCB node built for modular home telemetry and sensing.',
    },
  },
];

export const tryHackMeBadges = [
  'CompTIA Pentest+ Path',
  'Web Fundamentals',
  'Cyber Defense Path',
];
