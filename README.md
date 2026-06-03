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

| Commando          | Beschrijving                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start de lokale ontwikkelserver  |
| `npm run build`   | Bouw de site voor productie      |
| `npm run preview` | Preview de productiebuild lokaal |
| `npm run format`  | Format code met Prettier         |
| `npm run lint`    | Controleer formatting            |

### Makefile

Je kunt ook `make` gebruiken:

```bash
make dev        # Ontwikkelserver
make build      # Productie-build
make preview    # Preview
make deploy     # Deploy naar Strato
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

### Handmatig (deploy.sh)

```bash
cp .env.example .env
# Vul je FTP-credentials in .env
make deploy
```

### Handmatig (FileZilla of andere FTP client)

1. Open je FTP-client
2. Verbind met `5019631714.ssh.w2.strato.hosting`
3. Upload de inhoud van `dist/` naar `/httpdocs/`

---

## Environment Variables

Kopieer `.env.example` naar `.env` en vul je gegevens in:

```bash
cp .env.example .env
```

| Variabele        | Beschrijving                            |
| ---------------- | --------------------------------------- |
| `FTP_HOST`       | 5019631714.ssh.w2.strato.hosting        |
| `FTP_USER`       | FTP-gebruikersnaam                      |
| `FTP_PASS`       | FTP-wachtwoord                          |
| `FTP_REMOTE_DIR` | Webroot (standaard: /httpdocs/)         |
| `SITE_URL`       | Publieke URL van de site                |

**Let op:** `.env` staat in `.gitignore` en wordt nooit gecommit.

---

## Design

De website gebruikt het **Vibrant Kinetic** design systeem met de volgende kenmerken:

- **Kleuren**: Levendige kleuren met primaire kleuren in teal (#006b5b) en oranje (#a33800)
- **Typografie**: Epilogue voor headers, Plus Jakarta Sans voor body text
- **Stijl**: Modern, energiek en dynamisch

---

## License

© 2026 Talent2Empower. All rights reserved.
