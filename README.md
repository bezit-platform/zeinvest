# ZE Invest – Investice do udržitelné budoucnosti

Statický web s Cloudflare Pages Functions pro ZE Invest - projekty větrné energie.

## 🌬️ O projektu

ZE Invest se věnuje vývoji udržitelných řešení větrné energie. Tato webová aplikace prezentuje naše projekty a poskytuje informace potenciálním investorům a partnerům.

## 🚀 Technologie

- **HTML/CSS/JavaScript** - Čistý statický web
- **Cloudflare Pages** - Hosting a deployment
- **Cloudflare Pages Functions** - Serverless API pro kontaktní formulář
- **Resend API** - Odesílání emailů

## 📋 Předpoklady

- Node.js verze 15 nebo vyšší (jen pro lokální development)
- npm (Node Package Manager)
- Cloudflare account pro deployment

## 🔧 Instalace

1. Naklonujte repozitář:
```bash
git clone https://github.com/bezit-platform/zeinvest.git
cd zeinvest
```

2. Nainstalujte dev závislosti (volitelné, jen pro lokální server):
```bash
npm install
```

## 🏃 Spuštění

### Lokální development:
```bash
npm run dev
```

Aplikace poběží na `http://localhost:3000`

### Produkce (Cloudflare Pages):
1. Commitněte změny do Git
2. Pushnete na GitHub
3. Cloudflare Pages automaticky nasadí

## 📁 Struktura projektu

```
zeinvest/
├── functions/           # Cloudflare Pages Functions
│   └── api/
│       ├── _middleware.js    # CORS middleware
│       ├── contact.js        # Kontaktní formulář API
│       └── test.js           # Test endpoint
├── public/              # Statické soubory (obrázky, loga)
│   ├── logo.png
│   ├── projekt.png
│   ├── vte-cow.png
│   └── wind-turbine.jpg
├── index.html           # Hlavní HTML stránka
├── package.json         # Node.js konfigurace
└── README.md           # Dokumentace
```

## 🌍 Nasazení na Cloudflare Pages

### 1. Připojení GitHub repozitáře

1. Přihlaste se na [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Jděte do **Workers & Pages** → **Create application** → **Pages**
3. Připojte GitHub repozitář `bezit-platform/zeinvest`

### 2. Build nastavení

- **Build command:** (prázdné - statický web)
- **Build output directory:** `/`
- **Root directory:** `/`

### 3. Environment Variables

V Cloudflare Dashboard → Pages → zeinvest → Settings → Environment variables:

```
RESEND_API_KEY = re_xxxxx... (váš Resend API klíč)
MAIL_TO = info@zeinvest.cz
MAIL_FROM = onboarding@resend.dev
```

### 4. Deployment

- Každý push do `main` větve spustí automatický deployment
- Cloudflare vytvoří unikátní URL: `https://zeinvest.pages.dev`
- Můžete přidat vlastní doménu v Dashboard → Custom domains

## 📧 Kontaktní formulář

### Lokální development (bez emailů)

Bez `RESEND_API_KEY` formulář pouze loguje data do console:

```bash
npm run dev
# Formulář funguje, ale neod esílá skutečné emaily
```

### Production (se skutečnými emaily)

1. Zaregistrujte se na [Resend.com](https://resend.com)
2. Vytvořte API klíč
3. Přidejte Environment Variables do Cloudflare (viz výše)
4. Formulář bude odesílat skutečné emaily na `MAIL_TO`

### Test API endpoint

```bash
# Test zda Functions fungují
curl https://zeinvest.pages.dev/api/test

# Test odesílání formuláře
curl -X POST https://zeinvest.pages.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{"jmeno":"Test","email":"test@example.com","zprava":"Test zpráva"}'
```

## 📞 Kontakt

**ZE Invest**  
IČO: 222 68 715  
Chrustenice 179, 267 12 Chrustenice

Email: info@zeinvest.cz  
Web: https://github.com/bezit-platform/zeinvest

## 📄 Licence

ISC
