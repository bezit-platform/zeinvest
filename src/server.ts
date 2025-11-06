import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Povolit inline styles/scripts z HTML
}));

// Komprese odpovědí
app.use(compression());

// Statické soubory (obrázky, loga, atd.)
app.use('/public', express.static(path.join(__dirname, '../public')));

// Hlavní stránka
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).send('<h1>404 - Stránka nenalezena</h1><p><a href="/">Zpět na hlavní stránku</a></p>');
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('<h1>500 - Chyba serveru</h1>');
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`🌬️  ZE Invest server běží na http://localhost:${PORT}`);
  console.log(`📁 Statické soubory servirovány z /public`);
});

export default app;
