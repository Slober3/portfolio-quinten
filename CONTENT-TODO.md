# CONTENT-TODO — Overdrachtschecklist voor Definitieve Media & Links

Alle pagina’s van je portfolio werken nu foutloos met op maat gemaakte placeholders, demo-GPX en veilige voorbeeld-PDF’s. Gebruik onderstaande checklist om jouw echte bestanden en definitieve instellingen toe te voegen.

---

## 1. Definitief Productiedomein & Contactformulier (`.env`)
Kopieer `.env.example` naar `.env` (lokaal) en stel eventueel dezelfde waarden in onder **GitHub → Settings → Secrets and variables → Actions**:

| Variabele | Waarvoor | Voorbeeldwaarde |
| :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | Canonical-URL’s, `sitemap-index.xml`, JSON-LD | `https://quintendesmyter.be` of `https://7ol.eu` |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Gratis statisch contactformulier via Web3Forms | Jouw Web3Forms key |
| `PUBLIC_CONTACT_ENDPOINT` | Alternatief voor Web3Forms (bv. Formspree) | `https://formspree.io/f/...` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Optionele Cloudflare Turnstile anti-bot check | Turnstile site key |
| `PUBLIC_SHOWREEL_URL` | Optionele Bunny Stream / CDN MP4 showreel-URL | `https://...mp4` |

> **OpSec-regel:** Zet nooit een ruw `mailto:`-e-mailadres in de publieke HTML; laat het contactformulier via Web3Forms of Formspree lopen.

---

## 2. Echte Foto’s Toevoegen (`src/assets/photos/`)
Vervang de 6 voorbeeld-JPEGs in `src/assets/photos/` door jouw eigen hoogwaardige foto’s (ideaal **1600×1067 px** of minstens **1600 px** langste zijde, landschap `3:2`, JPEG of PNG zonder zichtbare nummerplaten):

- `src/assets/photos/macro-dew-optics.jpg` *(Natuur & Macro)*
- `src/assets/photos/forest-canopy-light.jpg` *(Natuur & Macro)*
- `src/assets/photos/hornet-apex-dusk.jpg` *(On the Road & Motorsport — let op: geen leesbare nummerplaat)*
- `src/assets/photos/spa-raidillon-mist.jpg` *(On the Road & Motorsport)*
- `src/assets/photos/adriatic-stone-dubrovnik.jpg` *(Reizen & Sfeer)*
- `src/assets/photos/atlantic-cliffs-portugal.jpg` *(Reizen & Sfeer)*

Werk vervolgens eventueel titels, omschrijvingen en veilige belichtingsmetadata (`mm · f/ · 1/s · ISO`) bij in `src/data/photos.ts`. De Sharp-pijplijn (`src/lib/safeSharpService.ts`) genereert automatisch AVIF + WebP en stript GPS- en serienummer-EXIF.

---

## 3. Echte Motorroutes (`src/data/gpx-raw/` → automatisch ±5 km getrimd)
1. Plaats je onbewerkte Kurviger / Calimoto / GPS `.gpx`-export in `src/data/gpx-raw/` (minimaal 12 km lang zodat een ±5 km trim aan begin en einde veilig blijft).
2. `npm run build` en `npm run build:zip` draaien automatisch `scripts/sanitize-gpx.mjs`, dat de eerste en laatste **5 km** en alle `<time>`-tags verwijdert en het resultaat opslaat in `public/gpx/<slug>.gpx`.
3. Pas desgewenst `gpxSlug` aan in `src/views/MotoView.astro` (of breid `MotoRouteMap.astro` uit met een keuzelijst).

---

## 4. `@QuintenMoto` YouTube Video ID’s (`src/data/moto.ts`)
Open `src/data/moto.ts` en vervang in `featuredVideos` de `youtubeId` waarden (11 karakters uit je echte `@QuintenMoto` video-URL's) en zet `isPlaceholder: false`:
- `Trier → Nürburg (UNCUT)`
- `Spa-Francorchamps Bikers’Festival (16 aug 2025)`

---

## 5. CV-PDF’s & Externe Profiel-URL’s
1. Vervang de voorlopige samenvattings-PDF’s door jouw definitieve CV (let op OpSec: vermijd eventueel exact huisadres/GSM als de PDF publiek op internet staat):
   - `public/cv/quinten-desmyter-cv-nl.pdf`
   - `public/cv/quinten-desmyter-cv-en.pdf`
2. Vul in `src/data/profile.ts` (`externalLinks`) jouw publieke profiel-URL’s aan (`linkedin`, `instagram`, `shutterstock`) zodra je die wilt tonen in de footer en pagina’s.

---

## 6. Projecten & Blogartikelen Uitbreiden
- Nieuwe tweetalige projecten: voeg `.mdx`-bestanden toe in `src/content/projects/nl/` en `src/content/projects/en/` en registreer het vertaalpaar in `src/i18n/routes.ts` (`TRANSLATION_PAIRS`).
- Nieuwe blogartikelen: voeg `.mdx`-bestanden toe in `src/content/blog/nl/` en `src/content/blog/en/` en registreer het vertaalpaar in `src/i18n/routes.ts`.
