// rockstandard.ai marketing site
// Tiny Express server: static public/, /api/health for Railway, SPA-ish 404 fallback to index.html.

const path = require('path');
const express = require('express');

const PORT = parseInt(process.env.PORT, 10) || 3100;
const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();

app.disable('x-powered-by');
app.use(express.static(PUBLIC_DIR, { extensions: ['html'], maxAge: '1h' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, app: 'rockstandard-site', ts: new Date().toISOString() });
});

app.use((_req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[rockstandard-site] listening on :${PORT}`);
});
