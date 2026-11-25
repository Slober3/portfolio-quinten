import type { Locale, PageKey } from './routes';

export interface NavItem {
  key: PageKey;
  label: string;
}

export const UI_COPY: Record<
  Locale,
  {
    htmlLang: string;
    motto: string;
    region: string;
    skipToContent: string;
    menuOpen: string;
    menuClose: string;
    themeToggleLabel: string;
    themeDark: string;
    themeLight: string;
    langSwitchLabel: string;
    navItems: NavItem[];
    footerNav: NavItem[];
    footerColophon: string;
    backToOverview: string;
    readMore: string;
    minRead: string;
  }
> = {
  nl: {
    htmlLang: 'nl-BE',
    motto: 'Systemen, Precisie & Vrijheid',
    region: 'Regio Lier / Kempen, België',
    skipToContent: 'Spring naar hoofdinhoud',
    menuOpen: 'Menu openen',
    menuClose: 'Menu sluiten',
    themeToggleLabel: 'Wissel tussen donker en licht thema',
    themeDark: 'Donker',
    themeLight: 'Licht',
    langSwitchLabel: 'Schakel naar het Engels',
    navItems: [
      { key: 'about', label: 'Over mij' },
      { key: 'tech', label: 'Onderwijs & IT' },
      { key: 'projects', label: 'Projecten' },
      { key: 'moto', label: 'Moto' },
      { key: 'photography', label: 'Fotografie' },
      { key: 'blog', label: 'Notities' },
      { key: 'contact', label: 'Contact' },
    ],
    footerNav: [
      { key: 'shooting', label: 'Schietsport & gids' },
      { key: 'uses', label: 'Uitrusting (/uses)' },
      { key: 'now', label: 'Nu (/now)' },
      { key: 'privacy', label: 'Privacy' },
      { key: 'contact', label: 'Contact' },
    ],
    footerColophon: '© Quinten Desmyter · Regio Lier, België',
    backToOverview: 'Terug naar overzicht',
    readMore: 'Lees meer',
    minRead: 'min lezen',
  },
  en: {
    htmlLang: 'en',
    motto: 'Systems, Precision & Freedom',
    region: 'Lier / Campine Region, Belgium',
    skipToContent: 'Skip to main content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeToggleLabel: 'Toggle dark and light theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    langSwitchLabel: 'Switch to Dutch (Belgium)',
    navItems: [
      { key: 'about', label: 'About' },
      { key: 'tech', label: 'Teaching & IT' },
      { key: 'projects', label: 'Projects' },
      { key: 'moto', label: 'Moto' },
      { key: 'photography', label: 'Photography' },
      { key: 'blog', label: 'Notes' },
      { key: 'contact', label: 'Contact' },
    ],
    footerNav: [
      { key: 'shooting', label: 'Sport Shooting' },
      { key: 'uses', label: 'Gear (/uses)' },
      { key: 'now', label: 'Now (/now)' },
      { key: 'privacy', label: 'Privacy' },
      { key: 'contact', label: 'Contact' },
    ],
    footerColophon: '© Quinten Desmyter · Lier Region, Belgium',
    backToOverview: 'Back to overview',
    readMore: 'Read more',
    minRead: 'min read',
  },
};
