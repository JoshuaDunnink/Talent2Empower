# Talent2Empower

Website voor Talent2Empower - Ondersteuning voor ouders, scholen en sportverenigingen. Gebouwd met [Astro](https://astro.build).

---

## Getting Started

### Vereisten

- **Node.js** ≥ 22 (aanbevolen: v22 LTS)
- **npm** ≥ 10

### Installatie

```bash
cd Talent2Empower
npm install
```

---

## Local Development

Start de ontwikkelserver:

```bash
npm run dev
# of
make dev
```

De site is beschikbaar op `http://localhost:4321`.

### Beschikbare scripts

| Commando               | Beschrijving                                           |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start de lokale ontwikkelserver                        |
| `npm run build`        | Bouw de site voor productie                            |
| `npm run preview`      | Preview de productiebuild lokaal                       |
| `npm run format`       | Format code met Prettier                               |
| `npm run lint`         | Controleer formatting                                  |
| `npm run theme`        | Genereer `src/styles/theme.css` uit `compile_theme.js` |
| `npm run photos`       | Sync Drive-foto's + verwerk ze (zie hieronder)         |
| `npm run photos:fetch` | Alleen rclone-sync vanuit Google Drive                 |
| `npm run photos:build` | Alleen verwerken (resize + watermerk + manifest)       |
| `npm run deploy`       | Mirror `dist/` naar Strato via SFTP (WinSCP)           |
| `npm run release`      | Build + deploy                                         |
| `npm run clean`        | Verwijder `dist/`                                      |

> **Windows:** gebruik `npm run …` (werkt in PowerShell). De `Makefile` en `deploy.sh`
> hieronder zijn voor WSL/Linux (`make` + `lftp`); op Windows zijn de npm-scripts het
> equivalent — er is geen `make` of bash nodig.

### Makefile (alleen WSL/Linux)

```bash
make dev        # Ontwikkelserver
make build      # Productie-build
make preview    # Preview
make deploy     # Deploy naar Strato (lftp)
make release    # Build + deploy
make clean      # Verwijder build-output
```

---

## Project Structure

```
Talent2Empower/
├── public/               # Statische bestanden (images, favicon)
├── src/
│   ├── components/       # Herbruikbare Astro-componenten
│   ├── layouts/          # Pagina-layouts
│   ├── pages/            # Pagina's
│   └── styles/           # CSS variabelen en global styles
├── astro.config.mjs      # Astro configuratie
├── package.json
├── tsconfig.json
├── Makefile
└── deploy.sh             # Handmatig FTP deploy script
```

---

## Building for Production

```bash
npm run build
```

De output verschijnt in `dist/`. Dit is de map die naar Strato wordt geüpload.

---

## Deploying to Strato

### Windows (aanbevolen) — `npm run deploy`

Vereist **WinSCP** (`winget install WinSCP.WinSCP`). `scripts/deploy.mjs` leest `.env`,
verbindt via SFTP en spiegelt `dist/` naar de webroot (verwijdert bestanden op de server die
lokaal niet meer bestaan — net als `lftp mirror --reverse --delete`).

```powershell
cp .env.example .env   # vul FTP_HOST / FTP_USER / FTP_PASS / FTP_REMOTE_DIR in
npm run release        # build + deploy
# of los: npm run build ; npm run deploy
```

> **Strato SSH/SFTP moet aan staan.** Krijg je een `No supported authentication methods`-fout,
> dan is SSH-toegang niet geactiveerd voor het account (of klopt de SSH-gebruikersnaam/wachtwoord
> niet). Activeer SSH in het Strato-configuratiepaneel en controleer `FTP_USER`/`FTP_PASS`. Poort
> is 22 (overschrijf met `FTP_PORT` in `.env`).

### WSL/Linux — `make deploy`

```bash
cp .env.example .env
make deploy   # gebruikt deploy.sh + lftp
```

### Handmatig (FileZilla / WinSCP GUI)

1. Verbind via **SFTP** met `${FTP_HOST}` poort 22
2. Upload de inhoud van `dist/` naar `${FTP_REMOTE_DIR}` (bijv. `/talent2empower/`)

---

## Environment Variables

Kopieer `.env.example` naar `.env` en vul je gegevens in:

```bash
cp .env.example .env
```

| Variabele        | Beschrijving                     |
| ---------------- | -------------------------------- |
| `FTP_HOST`       | 5019631714.ssh.w2.strato.hosting |
| `FTP_USER`       | FTP-gebruikersnaam               |
| `FTP_PASS`       | FTP-wachtwoord                   |
| `FTP_REMOTE_DIR` | Webroot (standaard: /httpdocs/)  |
| `SITE_URL`       | Publieke URL van de site         |

**Let op:** `.env` staat in `.gitignore` en wordt nooit gecommit.

---

## Fotografie-pipeline (Google Drive → /turn-fotografie)

De carousel op `/turn-fotografie` toont foto's uit een **privé** Google Drive-map. De pipeline
draait lokaal en op aanvraag (nieuwe foto's = pipeline draaien + `npm run release`):

1. `rclone sync` haalt de bronbestanden op (OAuth als eigenaar — map hoeft niet publiek).
   Ondersteunt JPEG/PNG **en RAW** (`.NEF`, `.CR2`, `.ARW`, `.DNG`).
2. `scripts/build-photos.mjs` verwerkt elke foto: bij RAW haalt het de ingebouwde full-size
   JPEG-preview eruit met **exiftool** (geen kwaliteitsverlies voor web), daarna verkleint sharp
   naar max 1600px, zet het watermerk "© Talent2Empower" rechtsonder, en schrijft webp's naar
   `public/fotografie/` + `src/data/fotografie-manifest.json`.
3. De bronbestanden in `.photos-src/` blijven buiten git; de verwerkte webp's + manifest worden
   **wel** gecommit zodat elke build/deploy compleet is. Volledige foto's alleen op aanvraag.

> **Curatie:** de carousel toont _alle_ foto's in de bronmap, dus zet daar een selectie neer
> (~10–25 hero-shots), niet een volledige RAW-dump. Bestandsnamen worden de alt-tekst — geef
> ze betekenisvolle namen (bijv. `precisie-op-de-balk.nef`), niet `DSC_0849.NEF`.

De site gebruikt momenteel een **subfolder** `1BvyL2N21Pvi_KSmXLmMUVyJunwa09_4D` als bron. Nieuwe
foto's daar neerzetten → `npm run photos`.

### Eenmalige setup (al gedaan op de deploy-machine)

```powershell
winget install Rclone.Rclone
winget install OliverBetz.ExifTool
rclone config create gdrive-t2e drive scope=drive.readonly root_folder_id=1BvyL2N21Pvi_KSmXLmMUVyJunwa09_4D
# → browser opent → inloggen als eigenaar van de map
rclone lsf gdrive-t2e:    # smoke test
```

> Windows-noot: als `rclone config` faalt met "socket ... forbidden" op poort 53682, draait de
> `winnat`-service in de weg. Fix (als admin): `net stop winnat`, draai de config, `net start winnat`.

Daarna bij nieuwe foto's: `npm run photos` en vervolgens `npm run release`.

Alternatief zonder rclone: als Google Drive voor Desktop de map al synct, wijs de bronmap aan
met `PHOTOS_SRC`:

```powershell
$env:PHOTOS_SRC = "G:\Mijn Drive\TurnFotos"; npm run photos:build
```

---

## Design

De website gebruikt het **Empower Modern** design systeem
(`stitch_talent2empower_website_redesign/empower_modern/DESIGN.md`):

- **Kleuren**: Koper (#9a4621 / #e88258), gouden oker (#ffbe4d), forest teal (#426464) op een
  crème ondergrond (#fcf9f8 / #FDF8F3)
- **Typografie**: Epilogue voor headers, Plus Jakarta Sans voor body text
- **Stijl**: Warm, menselijk en professioneel

De tokens staan in `src/styles/theme.css` — dat bestand is **gegenereerd**; pas
`compile_theme.js` aan en draai `npm run theme`.

De pagina's `/turn-fotografie` en `/watersport` gebruiken een donker sub-brand thema
(`theme-dark` in `src/styles/global.css`): blauw-op-donker met Anybody / Hanken Grotesk /
JetBrains Mono, conform de goedgekeurde Stitch-schermen.

---

## License

© 2026 Talent2Empower. All rights reserved.
