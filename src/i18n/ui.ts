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
    themeToggleLabel: 'Wissel tussen donker en licht kleurenthema',
    themeDark: 'Dark',
    themeLight: 'Light',
    langSwitchLabel: 'Schakel naar het Engels',
    navItems: [
      { key: 'about', label: 'Over mij' },
      { key: 'tech', label: 'Tech & Onderwijs' },
      { key: 'projects', label: 'Projecten' },
      { key: 'moto', label: 'Moto' },
      { key: 'photography', label: 'Fotografie' },
      { key: 'shooting', label: 'Schietsport' },
      { key: 'blog', label: 'Blog' },
      { key: 'contact', label: 'Contact' },
    ],
    footerNav: [
      { key: 'uses', label: '/uses' },
      { key: 'now', label: '/now' },
      { key: 'privacy', label: 'Privacy (GDPR)' },
      { key: 'contact', label: 'Contact' },
    ],
    footerColophon: '100% statisch gebouwd met Astro & Tailwind v4 · Nul cookies · OpSec-geaudit.',
    backToOverview: 'Terug naar overzicht',
    readMore: 'Lees dossier',
    minRead: 'min leestijd',
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
      { key: 'tech', label: 'Tech & Teaching' },
      { key: 'projects', label: 'Projects' },
      { key: 'moto', label: 'Moto' },
      { key: 'photography', label: 'Photography' },
      { key: 'shooting', label: 'Shooting' },
      { key: 'blog', label: 'Blog' },
      { key: 'contact', label: 'Contact' },
    ],
    footerNav: [
      { key: 'uses', label: '/uses' },
      { key: 'now', label: '/now' },
      { key: 'privacy', label: 'Privacy (GDPR)' },
      { key: 'contact', label: 'Contact' },
    ],
    footerColophon: '100% static build with Astro & Tailwind v4 · Zero cookies · OpSec audited.',
    backToOverview: 'Back to overview',
    readMore: 'Read dossier',
    minRead: 'min read',
  },
};
