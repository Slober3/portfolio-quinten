# AGENTS.md — Blijvende Projectregels (`portfolio-quinten`)

Dit document bevat de bindende architectuur-, inhouds-, toegankelijkheids- en OpSec-regels voor de persoonlijke, tweetalige portfoliowebsite van Quinten Desmyter. Elke AI-agent of ontwikkelaar die aan deze repository werkt, moet deze regels strikt naleven.

---

## 1. Architectuur & 100% Statische Hosting

- **Stack:** **Astro (stabiele v6.x, vastgepind op `6.4.x`) + Tailwind CSS v4 (`@tailwindcss/vite`) + TypeScript (`astro/tsconfigs/strict`)**.
- **Output-modus:** Altijd `output: 'static'` in `astro.config.mjs`.
- **Zelfstandige `.zip`-deploy:** De volledige productiebuild (`dist/`) moet zelfstandig draaien op klassieke statische / shared webhosting (**Apache / LiteSpeed** of **Nginx**) na het uploaden en uitpakken van één enkel `.zip`-archief (`release/portfolio-deploy.zip`) rechtstreeks in de webroot (`public_html` of `www`) — **zonder** extra bovenliggende `dist/`-map in de zip.
- **Verboden in productie:**
  - Geen server-side runtime (geen Node-server, geen PHP-backend, geen Cloudflare Workers SSR).
  - Geen SSR-afhankelijk CMS (geen Keystatic GitHub OAuth-routes in productie).
  - Geen cookies die een consent-banner vereisen (privacy-first analytics of nul tracking, voorkeursthema in `localStorage` zonder persoonsgegevens).
- **Webserverconfiguratie:**
  - `public/.htaccess` moet meekomen in `dist/` met: Force HTTPS, schone URL's, slimme root-redirect (`/` naar `/nl/` of `/en/` op basis van `Accept-Language`, met `/nl/` als fallback), aangepaste 404-pagina's (`/nl/404` & `/en/404`), `immutable` caching op gehashte assets en strikte security headers (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`) die compatibel blijven met lokale fonts, MapLibre GL JS en YouTube-facades (`youtube-nocookie.com`).
  - `README.md` bevat een gelijkwaardige Nginx-configuratie.
- **Contactformulier zonder eigen backend:**
  - Gebruik een configureerbaar extern formulier-endpoint via `.env` (bv. Web3Forms of Formspree) met anti-spam honeypot en optionele Cloudflare Turnstile-ondersteuning.
  - Voorzie altijd een propere fallback/statusmelding zolang er nog geen endpoint-key in `.env` is ingesteld.
  - **Lek NOOIT een ruw `mailto:`-adres of telefoonnummer in de HTML.**
- **Lokaal Node-beleid (Windows):** Astro 6.4.x vereist Node `>=22.12.0`. Het `node` devDependency (`22.23.5`) levert een lokaal `node_modules/.bin/node.exe` voor `npm run ...` scripts wanneer de globale systeem-Node ouder is. Gebruik daarom altijd `npm run <script>`.

---

## 2. Strikte OpSec- & Privacygrenzen (Zero-Tolerance)

De volgende informatie mag **NOOIT** in code, contentbestanden, afbeeldingen (EXIF), GPX-tracks, JSON-LD of build-output voorkomen:

1. **Exact thuisadres of start-/eindlocaties bij de woning:** Alleen brede regio-aanduiding toegestaan: `Regio Lier / Kempen, België`.
2. **Persoonlijke contactgegevens:** Geen GSM-nummer, geen ruw `mailto:`-e-mailadres in publieke HTML.
3. **Hardcoded leeftijd of geboortedatum:** Schrijf **NOOIT** een vaste leeftijd (bv. `"32 jaar"`) of exacte geboortedatum in teksten, schema's of voorbeelden, zodat de site nooit veroudert.
4. **Hardware-, wapen- & camera-identificatie:** Geen serienummers, geen exacte kluislocaties, geen slaapkamer- of woningindeling, geen beveiligingscameramodellen of -opstellingen (geen EZVIZ-details).
5. **Real-time status & voertuigen:** Geen live reis- of afwezigheidsstatus, geen nummerplaten op motor- of reisfoto's.
6. **Financiële gegevens & derden:** Geen financiële cijfers, spaar-/beleggingsinfo, geen studenten-R-nummers, geen interne wachtwoorden of tokens.

### Verplichte OpSec-automatisering (voor elke release-build)
- **`scripts/sanitize-gpx.mjs`:** Verwerkt bron-GPX-bestanden uit `src/data/gpx-raw/` naar `public/gpx/` en knipt automatisch de eerste en laatste **5 km** van elke track weg zodat start-/eindlocaties bij de woning nooit uitlekken.
- **`scripts/audit-opsec.mjs`:** Scant `dist/` na elke build op achtergebleven EXIF GPS-tags/serienummers in afbeeldingen en verboden patronen in HTML/JS/JSON/XML. De build **moet falen** bij elk gedetecteerd lek.
- **Afbeeldingen:** Astro + Sharp pipeline strip altijd gevoelige EXIF-metadata, met behoud van `.rotate()` (oriëntatie) en `.keepIccProfile()` (kleurprofiel).

---

## 3. Profiel, Toon & Persoonlijke Inhoudsrichtlijnen

- **Kernidentiteit & Motto:** Quinten Desmyter — *Systemen, Precisie & Vrijheid* (*Systems, Precision & Freedom*).
- **Professionele pijlers:**
  - Praktijklector Cloud, Netwerken & Cybersecurity aan **Thomas More Hogeschool (IT Factory, Campus Geel)** (`1ITF` NL & `1ACS` EN): Cloud & Infrastructure (AWS, Docker, Kubernetes, Linux), Windows SysAdmin (AD, Registry, Systems as Code, PowerShell), Cisco CCNA 1 & 2, IoT/Electronics, didactiek (Flip the Classroom, projectgebaseerd leren).
  - **SIN (`sinners.be`):** Alleen een korte, bescheiden en niet-technische vermelding als coach (houd dit klein en licht geen SIN-infrastructuur/Kubernetes-case groot uit).
  - **RTC Antwerpen:** Cisco-labworkshops & Train-the-Trainer.
  - **Boeken (beide ISBN's exact vermelden waar relevant):**
    - *Thoughts on cyber security* (`ISBN 9798651810475`)
    - *Informatica: Programmeren met Python* (`ISBN 9798654331892`)
  - **GitHub (`Slober3`) & Hardware:** *PotHead* (PHP honeypot), *ESP32-Public-Honeypot*, *BeeHive* (open-source IoT bijenkast), *Pester-Test-Examples*, *Home+ Domotica Svejr Station* (PCB), TryHackMe-certificaten.
- **Brugprojecten:**
  - **Weavers Fate:** Strategisch bluf- & dobbelspel (3–5 spelers, 6 bekers, 28 D6, Cup of Fate, 16 Souls als HP en inzetvaluta, Chaos Counter, Power-Up kaarten).
  - **Schietsport, Trainingsdata & Computer Vision:** Gelicentieerd VSK-sportschutter (LEDO Lier), veiligheids- & Belgische wetgevingsgids *"From Zero to Item"*, gebruik van *RangeBook* en *Shooting Companion* puur voor eigen trainingsstatistieken, en R&D rond geautomatiseerde ISSF 25m/50m doelkaart-scoring & schuttersbiomechanica.
- **MotoAdventures (`@QuintenMoto`):**
  - Motorfiets: **Honda CB750 Hornet (~35.000 km)**, focus op bochtige binnendoorwegen (Kurviger / Calimoto / Waze; Ardennen, Eifel, *Trier – Nürburg*).
  - Spa-Francorchamps Bikers'Festival (16 aug 2025): 6 testritten (CRF1100L Africa Twin, XL750 Transalp, Yamaha Tracer 9 GT, CF MOTO 800MT Explore, Honda NC750X DCT, Benelli Imperiale 400).
  - Rig: **DJI Osmo Action** + officiële DJI ND-filterset + magnetische helm-/stuurmounts + **DJI Mic Mini** (1 TX + 1 RX).
- **Audio, Creatief & Persoonlijke noot (`/over-mij`, `/uses`, `/now`):**
  - Desk audio: **Blue Yeti microfoon** op zwarte **Blue Yeti boom arm**.
  - Creatief & hobby's: **Laser-cutting ontwerp (SVG/DXF)**, het leren spelen van de **Hokema B17 17-key kalimba (C-majeur)**, voorliefde voor **sci-fi & post-apocalyptische/LitRPG fictie** (*Stargate SG-1*, *Dungeon Crawler Carl*), anime & Japanse cultuur/ramen, en teckel **Stitch**.

---

## 4. Tweetaligheid (`nl-BE` & `en`)

- Expliciete taalprefixen voor alle productieroutes: `/nl/...` en `/en/...`.
- Correcte `hreflang`-tags op elke pagina: `hreflang="nl-BE"`, `hreflang="en"` en `hreflang="x-default"` (gebruik **NOOIT** `hreflang="be"`, want dat is Wit-Russisch!).
- Taalschakelaar `NL | EN` in de navigatie moet altijd naar het overeenkomstige vertaalde pad verwijzen.

---

## 5. Visueel Systeem & WCAG 2.2 Level AA

- **Kleurpalet ("Precision & Motion", Dark-first + gekalibreerde Light Mode):**
  - **Dark Mode (Default):** Canvas `#0B0E14`, Surface 1 `#131822`, Surface 2 `#1C2331`, Border `#2A3446`, Tekst primair `#EDF2F7`, Tekst secundair `#9AA8BE`, Accent Kinetic `#F59E0B` (`#FBBF24` hover), Telemetry `#38BDF8`, Status `#34D399`.
  - **Light Mode:** Canvas `#F7F8FA`, Surface 1 `#FFFFFF`, Surface 2 `#EEF1F6`, Border `#D5DCE6`, Tekst primair `#0F172A`, Tekst secundair `#475569`, Accent Kinetic `#B45309` (`#92400E` hover), Telemetry `#0369A1`, Status `#047857`.
  - Vermijd pure `#000000` / `#FFFFFF` combinaties (voorkomt halation voor astigmatisme).
- **Typografie (lokaal geserveerd via Astro Fonts API, nul runtime Google Fonts calls):**
  - Display: `Space Grotesk` (`--font-display`)
  - Body: `Inter` (`--font-sans`, `line-height: 1.6`)
  - Monospace / Telemetrie / ISBN / Code: `JetBrains Mono` (`--font-mono`)
- **WCAG 2.2 Level AA vereisten:**
  - **SC 2.4.11 (Focus Not Obscured):** `scroll-padding-top` altijd ruimer dan de sticky header (`>= 6.5rem`), plus duidelijke `:focus-visible` ring (`>= 2px`, contrast `>= 3:1`).
  - **SC 2.5.8 (Target Size Minimum):** Alle interactieve knoppen/links minimaal `24×24 CSS px` (`>= 44×44 CSS px` op mobiele kernacties).
  - **SC 2.5.7 (Dragging Movements):** Kaarten (MapLibre) en lightboxes (PhotoSwipe) bieden altijd klikbare knop- en toetsenbordalternatieven naast slepen/pinch.
  - **Progressive enhancement:** Scroll-animaties strikt binnen `@supports (animation-timeline: view())` én `@media (prefers-reduced-motion: no-preference)`.

---

## 6. Git-Native Content Conventies

- Alle content (projecten, blogposts, motorritten, fotografiecollecties, `/uses`, `/now`) staat in strak getypeerde **MDX / YAML / JSON-bestanden** onder `src/content/` en `src/data/` met Zod-schema's.
- Gebruik op maat gemaakte SVG/placeholder-visuals zolang definitieve foto's of GPX-bestanden ontbreken (nooit gebroken `<img>`-tags), en documenteer ontbrekende aanleverbestanden in `CONTENT-TODO.md`.
