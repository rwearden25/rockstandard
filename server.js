// rockstandard.ai marketing site
// Tiny Express server: static public/, /api/health for Railway, SPA-ish 404 fallback to index.html.

const path = require('path');
const express = require('express');

const PORT = parseInt(process.env.PORT, 10) || 3100;
const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();

app.disable('x-powered-by');

// Force-no-cache for /tours so iterations on tour HTML/CSS show up immediately
app.use('/tours', (_req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(express.static(PUBLIC_DIR, { extensions: ['html'], maxAge: '0' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, app: 'rockstandard-site', ts: new Date().toISOString() });
});

app.use((_req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[rockstandard-site] listening on :${PORT}`);
});
