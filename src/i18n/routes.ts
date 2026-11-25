export type Locale = 'nl' | 'en';

export type PageKey =
  | 'home'
  | 'about'
  | 'tech'
  | 'projects'
  | 'moto'
  | 'photography'
  | 'shooting'
  | 'blog'
  | 'uses'
  | 'now'
  | 'contact'
  | 'privacy';

export const STATIC_ROUTES: Record<PageKey, Record<Locale, string>> = {
  home: { nl: '/nl/', en: '/en/' },
  about: { nl: '/nl/over-mij/', en: '/en/about/' },
  tech: { nl: '/nl/tech/', en: '/en/tech/' },
  projects: { nl: '/nl/projecten/', en: '/en/projects/' },
  moto: { nl: '/nl/moto/', en: '/en/moto/' },
  photography: { nl: '/nl/fotografie/', en: '/en/photography/' },
  shooting: { nl: '/nl/schietsport/', en: '/en/shooting/' },
  blog: { nl: '/nl/blog/', en: '/en/blog/' },
  uses: { nl: '/nl/uses/', en: '/en/uses/' },
  now: { nl: '/nl/now/', en: '/en/now/' },
  contact: { nl: '/nl/contact/', en: '/en/contact/' },
  privacy: { nl: '/nl/privacy/', en: '/en/privacy/' },
};

/** Bidirectional slug mapping for translated blog articles and projects */
export const TRANSLATION_PAIRS: Array<{ nl: string; en: string }> = [
  {
    nl: '/nl/projecten/weavers-fate/',
    en: '/en/projects/weavers-fate/',
  },
  {
    nl: '/nl/projecten/schietsport-computer-vision/',
    en: '/en/projects/shooting-computer-vision/',
  },
  {
    nl: '/nl/projecten/honeypots-iot-security/',
    en: '/en/projects/honeypots-iot-security/',
  },
  {
    nl: '/nl/projecten/beehive-homeplus-hardware/',
    en: '/en/projects/beehive-homeplus-hardware/',
  },
  {
    nl: '/nl/blog/flip-the-classroom-it-onderwijs/',
    en: '/en/blog/flipped-classroom-it-education/',
  },
  {
    nl: '/nl/blog/systems-as-code-powershell-pester/',
    en: '/en/blog/systems-as-code-powershell-pester/',
  },
  {
    nl: '/nl/blog/cisco-ccna-netwerk-troubleshooting/',
    en: '/en/blog/cisco-ccna-network-troubleshooting/',
  },
  {
    nl: '/nl/blog/esp32-rtos-sensoren-in-de-praktijk/',
    en: '/en/blog/esp32-rtos-sensors-in-practice/',
  },
];

export function normalizePathname(pathname: string): string {
  const clean = pathname.replace(/\/index\.html$/, '/');
  if (clean === '/' || clean === '') return '/';
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function getSwitchLocaleUrl(pathname: string, targetLocale: Locale): string {
  const norm = normalizePathname(pathname);

  for (const key of Object.keys(STATIC_ROUTES) as PageKey[]) {
    const pair = STATIC_ROUTES[key];
    if (pair.nl === norm || pair.en === norm) {
      return pair[targetLocale];
    }
  }

  for (const pair of TRANSLATION_PAIRS) {
    if (pair.nl === norm || pair.en === norm) {
      return pair[targetLocale];
    }
  }

  return targetLocale === 'nl' ? '/nl/' : '/en/';
}

export function getAlternateUrls(pathname: string, siteBase: string | URL) {
  const base = String(siteBase).replace(/\/$/, '');
  const nlPath = getSwitchLocaleUrl(pathname, 'nl');
  const enPath = getSwitchLocaleUrl(pathname, 'en');
  return {
    nlPath,
    enPath,
    nlUrl: `${base}${nlPath}`,
    enUrl: `${base}${enPath}`,
    xDefaultUrl: `${base}${nlPath}`,
  };
}
