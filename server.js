const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Povolit inline styles/scripts z HTML
}));

// Komprese odpovědí
app.use(compression());

// Statické soubory (obrázky, loga, atd.)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Hlavní stránka
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('<h1>404 - Stránka nenalezena</h1><p><a href="/">Zpět na hlavní stránku</a></p>');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('<h1>500 - Chyba serveru</h1>');
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`🌬️  ZE Invest server běží na http://localhost:${PORT}`);
  console.log(`📁 Statické soubory servirovány z /public`);
});

module.exports = app;
