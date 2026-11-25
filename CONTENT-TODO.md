# Eigen content uitbreiden (optioneel)

De website gebruikt nu rechtstreeks jouw echte foto's uit Google Foto's (automatisch EXIF-gestript met behoud van oriëntatie en kleurprofiel) en alle 4 jouw directe `@QuintenMoto` YouTube-video's.

Wil je later extra foto's, nieuwe video's of een extern contactformulier toevoegen:
- **Extra foto's:** Plaats `.jpg`-bestanden in `src/assets/photos/` en voeg ze toe aan `src/data/photos.ts`.
- **Nieuwe YouTube-video's:** Voeg een object met het 11-teken `youtubeId` toe aan `src/data/moto.ts`.
- **Contactformulier (optioneel):** Kopieer `.env.example` naar `.env` en vul `PUBLIC_WEB3FORMS_ACCESS_KEY` of `PUBLIC_CONTACT_ENDPOINT` in om het formulier te activeren bovenop de directe kanalen.
- **Eigen domeinnaam:** Stel `PUBLIC_SITE_URL=https://jouwdomein.be` in via `.env`.
- **Extra GPX-routes:** Plaats ruwe `.gpx`-bestanden in `src/data/gpx-raw/`; `npm run build:zip` knipt automatisch de eerste en laatste 5 km weg.
