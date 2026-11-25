# Portfolio Quinten Desmyter — *Systemen, Precisie & Vrijheid*

Tweetalige (`nl-BE` & `en`), 100% statische portfoliowebsite gebouwd met **Astro 6.4.x**, **Tailwind CSS v4** en **TypeScript**, zonder server-side runtime, zonder database en zonder trackingcookies.

---

## Belangrijkste Eigenschappen

- **Editorial Showcase-architectuur:** Typografie-gedreven weergave (`Space Grotesk`, `Inter`, `JetBrains Mono` lokaal gebundeld via Astro Fonts API) met Dark Mode standaard en gekalibreerde Light Mode (WCAG 2.2 Level AA).
- **100% Statische Hosting via `.zip`:** Alle pagina’s worden gecompileerd naar `dist/` inclusief `public/.htaccess`, en verpakt naar `release/portfolio-deploy.zip` (rechtstreeks uitpakbaar in `public_html` of `www`).
- **Strikte OpSec-automatisering:**
  - `scripts/sanitize-gpx.mjs`: knipt automatisch de eerste en laatste **5 km** en alle `<time>`-tags weg uit `src/data/gpx-raw/*.gpx` naar `public/gpx/`.
  - `src/lib/safeSharpService.ts`: Sharp-pipeline met `.rotate()` en `.keepIccProfile()`, maar **zonder** GPS/camera-EXIF in de gecompileerde AVIF/WebP-beelden.
  - `scripts/audit-opsec.mjs`: controleert `dist/` na elke build op achtergebleven EXIF-metadata, verboden persoonsgegevens, hardcoded leeftijd, GSM-nummers en `mailto:`-links en laat de build falen bij enig lek.

---

## 1. Lokaal Aanpassen & Bouwen

**Vereiste:** Node.js `>= 22.12.0`. *(Op Windows-machines met een oudere globale Node-versie zit `node@22.23.5` al als `devDependency` in dit project, waardoor `npm run <script>` automatisch de juiste runtime gebruikt.)*

```bash
# 1. Afhankelijkheden installeren
npm install

# 2. (Optioneel) .env configureren voor domeinnaam & contactformulier
cp .env.example .env

# 3. Lokaal ontwikkelen met live reload
npm run dev

# 4. Volledige release bouwen: GPX trim + astro check + build + OpSec audit + .zip
npm run build:zip
```

Het eindresultaat staat in `release/portfolio-deploy.zip`. Alle bestanden staan rechtstreeks op rootniveau in het archief (dus **zonder** extra bovenliggende `dist/`-map), inclusief `.htaccess`.

---

## 2. Teksten, Foto’s & Routes Aanpassen via GitHub

Je hoeft lokaal niets te installeren om inhoud bij te werken:

1. Bewerk in GitHub direct de juiste bestanden in:
   - `src/content/projects/nl/` & `en/` (Projectdossiers in MDX)
   - `src/content/blog/nl/` & `en/` (Kennisbankartikels in MDX)
   - `src/data/` (`profile.ts`, `moto.ts`, `photos.ts`, `usesAndNow.ts`)
   - `src/assets/photos/` (foto's) en `src/data/gpx-raw/` (ruwe motorroutes)
2. Commit en push naar `main`.
3. De GitHub Actions workflow `.github/workflows/build-release.yml` draait automatisch `npm run build:zip` (type-check + statische build + OpSec-audit) en levert **`portfolio-deploy-zip`** op als kant-en-klaar downloadbaar GitHub Artifact.

*(Optionele variabelen zoals `PUBLIC_SITE_URL` of `PUBLIC_WEB3FORMS_ACCESS_KEY` stel je éénmalig in onder **GitHub Repository → Settings → Secrets and variables → Actions**.)*

---

## 3. Deployen op Webhosting

### Optie A — Apache / LiteSpeed Shared Hosting (`public/.htaccess` inbegrepen)
1. Download `release/portfolio-deploy.zip` (lokaal na `npm run build:zip`, of als Artifact uit GitHub Actions).
2. Open File Manager of SFTP van je webhosting en ga naar je webroot (`public_html/` of `www/`).
3. Upload en pak `portfolio-deploy.zip` **rechtstreeks** uit in de webroot (zorg dat verborgen bestanden zichtbaar zijn zodat `.htaccess` aanwezig is).
4. Klaar: Force HTTPS, `Accept-Language` root-redirect (`/` → `/nl/` of `/en/`), schone URL’s, `immutable` asset-caching, 404-pagina’s en strikte Security Headers werken meteen.

### Optie B — Nginx Serverblok (voor VPS / Docker / latere hostingwissel)
Indien je later verhuist naar een Nginx-server, pak dezelfde inhoud uit naar `/var/www/portfolio/html` en gebruik onderstaand serverblok:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name quintendesmyter.be www.quintendesmyter.be;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name quintendesmyter.be www.quintendesmyter.be;

    root /var/www/portfolio/html;
    index index.html;

    # Slimme taalredirect op de root
    set $lang_target "/nl/";
    if ($http_accept_language ~* "^en") {
        set $lang_target "/en/";
    }
    location = / {
        add_header Vary "Accept-Language" always;
        return 302 $lang_target;
    }

    # Schone URL's & tweetalige 404
    location /en/ {
        try_files $uri $uri/ $uri.html =404;
        error_page 404 /en/404/index.html;
    }
    location / {
        try_files $uri $uri/ $uri.html =404;
        error_page 404 /nl/404/index.html;
    }

    # Immutable caching op gehashte Astro assets en fonts
    location ~* \.(?:woff2|avif|webp|css|js|mjs)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), interest-cohort=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob: https://i.ytimg.com; media-src 'self' https://*.b-cdn.net https://iframe.mediadelivery.net; frame-src https://www.youtube-nocookie.com https://challenges.cloudflare.com https://iframe.mediadelivery.net; connect-src 'self' https://api.web3forms.com https://formspree.io; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com https://formspree.io; upgrade-insecure-requests;" always;
}
```
