# Eigen content aanpassen (optioneel)

De website is direct volledig bruikbaar en publiceerbaar zoals hij nu is. Wil je later eigen foto's, specifieke YouTube-embeds, een contactformulier-sleutel of je eigen domeinnaam koppelen, dan kan dat eenvoudig in de bestanden hieronder.

## 1. Eigen foto's (optioneel)
Alle foto's in `src/assets/photos/` worden tijdens elke build automatisch naar AVIF & WebP geoptimaliseerd met automatische EXIF-stripping (oriëntatie en kleurprofiel blijven behouden). Vervang gewoon een bestaand `.jpg`-bestand onder dezelfde naam:
- `hero-workspace.jpg` (werkplek / hero)
- `about-stitch-cozy.jpg` (persoonlijk / Stitch)
- `hornet-apex-dusk.jpg` & `spa-raidillon-mist.jpg` (motorritten)
- `project-weavers-fate.jpg` & `project-precision-sport.jpg` (projecten)
- `macro-dew-optics.jpg`, `forest-canopy-light.jpg`, `adriatic-stone-dubrovnik.jpg`, `atlantic-cliffs-portugal.jpg`, `pcb-bench-craft.jpg`, `lasercut-kalimba-lab.jpg` (fotogalerij)

## 2. Specifieke YouTube-embeds op `/nl/moto/` & `/en/moto/`
Standaard linken de videokaarten netjes naar `https://www.youtube.com/@QuintenMoto/videos`. Wil je een specifieke video rechtstreeks op de pagina afspelen, vul dan het 11-teken `youtubeId` in bij `src/data/moto.ts`.

## 3. Contactformulier activeren (optioneel)
Standaard toont `/nl/contact/` je geverifieerde directe kanalen (GitHub, YouTube, Thomas More) zonder een ruw e-mailadres in de HTML. Kopieer `.env.example` naar `.env` en vul `PUBLIC_WEB3FORMS_ACCESS_KEY` of `PUBLIC_CONTACT_ENDPOINT` in om automatisch het directe contactformulier in te schakelen.

## 4. Eigen domeinnaam & optionele profiellinks
- **Domeinnaam:** Stel `PUBLIC_SITE_URL=https://jouwdomein.be` in via `.env` (standaard `https://quintendesmyter.be`).
- **Extra sociale profielen:** Vul eventueel `linkedin`, `instagram` of `shutterstock` aan in `src/data/profile.ts` (lege velden blijven verborgen).
- **Eigen GPX-routes:** Plaats ruwe `.gpx`-bestanden in `src/data/gpx-raw/`; `npm run build:zip` knipt automatisch de eerste en laatste 5 km weg voordat het bestand in `public/gpx/` terechtkomt.
- **Eigen CV-PDF's:** De meegeleverde `public/cv/quinten-desmyter-cv-nl.pdf` en `public/cv/quinten-desmyter-cv-en.pdf` zijn direct bruikbaar, of je vervangt ze door je eigen export.
