# ZE Invest – Investice do udržitelné budoucnosti

Node.js webová aplikace pro ZE Invest - projekty větrné energie.

## 🌬️ O projektu

ZE Invest se věnuje vývoji udržitelných řešení větrné energie. Tato webová aplikace prezentuje naše projekty a poskytuje informace potenciálním investorům a partnerům.

## 🚀 Technologie

- **Node.js 15+** - Runtime prostředí
- **Express.js** - Web framework
- **Helmet** - Bezpečnostní middleware
- **Compression** - Komprese HTTP odpovědí

## 📋 Předpoklady

- Node.js verze 15 nebo vyšší
- npm (Node Package Manager)

## 🔧 Instalace

1. Naklonujte repozitář:
```bash
git clone https://github.com/bezit-platform/zeinvest.git
cd zeinvest
```

2. Nainstalujte závislosti:
```bash
npm install
```

## 🏃 Spuštění

### Produkční režim:
```bash
npm start
```

### Vývojový režim (s automatickým restartem):
```bash
npm run dev
```

Aplikace poběží na `http://localhost:3000`

## 📁 Struktura projektu

```
zeinvest/
├── public/              # Statické soubory (obrázky, loga)
│   ├── logo.png
│   ├── projekt.png
│   ├── vte-cow.png
│   └── wind-turbine.jpg
├── index.html           # Hlavní HTML stránka
├── server.js            # Express server
├── package.json         # Node.js konfigurace
└── README.md           # Dokumentace
```

## 🌍 Nasazení

### Proměnné prostředí

Aplikace podporuje následující environment proměnné:
- `PORT` - Port, na kterém běží server (výchozí: 3000)

### Cloudflare Pages / Vercel / Netlify

Pro nasazení na hosting platformy:
1. Propojte GitHub repozitář
2. Nastavte build command: `npm install`
3. Nastavte start command: `npm start`
4. Root directory: `/`

## 📞 Kontakt

**ZE Invest**  
IČO: 222 68 715  
Chrustenice 179, 267 12 Chrustenice

Email: info@zeinvest.cz  
Web: https://github.com/bezit-platform/zeinvest

## 📄 Licence

ISC
