export const externalLinks = {
  github: 'https://github.com/Slober3',
  youtubeMoto: 'https://www.youtube.com/@QuintenMoto',
  thomasMore: 'https://thomasmore.be/nl/opleidingen/professionele-bachelor/toegepaste-informatica',
  thomasMoreRtc: 'https://thomasmore.be/nl/vormingen/datacommunicatie-en-netwerken',
  pcbWaySvejr: 'https://www.pcbway.com/project/share/Home__Domotica_Svejr_Station.html',
  // Optionele publieke profielen — worden automatisch getoond zodra een URL wordt ingevuld:
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
      nl: 'Praktische inzichten over hedendaagse cybersecurity-dreigingen, preventie en de menselijke factor achter veilige systemen.',
      en: 'Practical perspectives on modern cybersecurity threats, everyday defense hygiene, and the human factor behind secure systems.',
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
      nl: 'Een compact en toegankelijk handboek dat beginners stap voor stap meeneemt van logisch denken naar heldere Python-code.',
      en: 'A compact, approachable handbook guiding beginners step-by-step from structured thinking to clean Python code.',
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
      nl: 'Ik geef les in zowel de Nederlandstalige (1ITF) als Engelstalige (1ACS) opleidingen Toegepaste Informatica: Cloud & Infrastructure (AWS, Docker, Kubernetes, Linux), Windows SysAdmin (Active Directory, Systems as Code, PowerShell), Cisco CCNA 1 & 2 en IoT/Electronics. Daarnaast ben ik ook betrokken als coach bij studentenorganisatie SIN.',
      en: 'Teaching across both Dutch (1ITF) and English (1ACS) Applied Computer Science tracks: Cloud & Infrastructure (AWS, Docker, Kubernetes, Linux), Windows SysAdmin (Active Directory, Systems as Code, PowerShell), Cisco CCNA 1 & 2, and IoT/Electronics. Alongside teaching, I am also involved as a coach at student organization SIN.',
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
      nl: 'Begeleiden van praktijkgerichte Cisco-netwerkworkshops en kennisdeling met collega-leerkrachten uit het secundair onderwijs in de provincie Antwerpen.',
      en: 'Leading hands-on Cisco networking workshops and Train-the-Trainer sessions for STEM teachers across the Antwerp province.',
    },
  },
  {
    period: '2020',
    periodEn: '2020',
    role: {
      nl: 'Auteur van twee IT-handboeken',
      en: 'Author of two IT handbooks',
    },
    org: 'Eigen uitgave · ISBN 9798651810475 & 9798654331892',
    details: {
      nl: 'Publicatie van Thoughts on cyber security en Informatica: Programmeren met Python — geschreven om de drempel richting het echte werkveld te verlagen.',
      en: 'Published Thoughts on cyber security and Informatica: Programmeren met Python to bridge classroom theory and practical engineering.',
    },
  },
  {
    period: 'Opleiding & onderwijsbeleid',
    periodEn: 'Education & Governance',
    role: {
      nl: 'Prof. Bachelor Elektronica-ICT & Pedagogisch Getuigschrift',
      en: 'B.Sc. Electronics-ICT & Pedagogical Teaching Certificate',
    },
    org: 'Elektronica-ICT · VTI-praktijkervaring · VVS / VLOR',
    details: {
      nl: 'Een technische basis in Elektronica-ICT gecombineerd met pedagogische scholing, leservaring (o.a. VTI Lier) en beleidsmatige betrokkenheid via de Vlaamse Vereniging van Studenten (VVS) in VLOR-publicaties rond curriculumkwaliteit.',
      en: 'Combining an Electronics-ICT engineering background with formal teaching pedagogy, secondary-school practice, and student representation via VVS and VLOR.',
    },
  },
];

export const githubHighlights = [
  {
    name: 'PotHead',
    stack: 'PHP · Security',
    url: 'https://github.com/Slober3/PotHead',
    description: {
      nl: 'Een modulaire PHP web-honeypot die geautomatiseerde aanvalspogingen registreert zodat studenten echte aanvalspatronen kunnen analyseren.',
      en: 'A modular PHP web honeypot that logs automated probing and credential-stuffing attempts for hands-on classroom analysis.',
    },
  },
  {
    name: 'ESP32-Public-Honeypot',
    stack: 'C++ · ESP32 · IoT',
    url: 'https://github.com/Slober3/ESP32-Public-Honeypot',
    description: {
      nl: 'Lichtgewicht honeypot op een ESP32-microcontroller die zichtbaar maakt hoe snel IoT-poorten op het internet gescand worden.',
      en: 'Lightweight microcontroller honeypot demonstrating how quickly exposed IoT ports attract automated scanning.',
    },
  },
  {
    name: 'BeeHive',
    stack: 'IoT · Sensoren',
    url: 'https://github.com/Slober3/BeeHive',
    description: {
      nl: 'Open-source sensoropstelling om temperatuur, luchtvochtigheid en activiteit in een slimme bijenkast op te volgen.',
      en: 'Open-source sensor setup for tracking temperature, humidity, and activity inside a connected beehive.',
    },
  },
  {
    name: 'Pester-Test-Examples',
    stack: 'PowerShell · Pester',
    url: 'https://github.com/Slober3/Pester-Test-Examples',
    description: {
      nl: 'Praktische Pester-tests waarmee Windows Server, Active Directory en DNS automatisch op correcte configuratie worden nagekeken.',
      en: 'Practical Pester test suites verifying Windows Server roles, Active Directory state, and DNS automatically.',
    },
  },
  {
    name: 'ScraperAfspraakCheckerGemeente',
    stack: 'Python · Selenium',
    url: 'https://github.com/Slober3/ScraperAfspraakCheckerGemeente',
    description: {
      nl: 'Een nuchter Python-script dat automatisch beschikbare gemeentelijke afspraakslots opvolgt — code inzetten tegen alledaagse frustratie.',
      en: 'A pragmatic Python script that monitors municipal appointment slots — using code to remove everyday friction.',
    },
  },
  {
    name: 'Home+ Domotica Svejr Station',
    stack: 'Custom PCB · PCBWay',
    url: 'https://www.pcbway.com/project/share/Home__Domotica_Svejr_Station.html',
    description: {
      nl: 'Een zelf ontworpen en geproduceerde printplaat voor modulaire thuisautomatisering en omgevingsmetingen.',
      en: 'A custom-designed and fabricated PCB built for modular home sensing and automation.',
    },
  },
];

export const tryHackMeBadges = [
  'CompTIA Pentest+ Path',
  'Web Fundamentals',
  'Cyber Defense Path',
];
