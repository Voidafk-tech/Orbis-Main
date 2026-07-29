/**
 * Renders public/og-card.png — the 1200x630 image every link preview shows
 * (LinkedIn, X, Slack, iMessage, WhatsApp). Without one, a shared link renders
 * as a bare URL, which measurably costs clicks.
 *
 * Run by hand, not by `npm run build`: it needs a Chromium binary and the
 * Google Fonts CDN, and the deploy should not depend on either. The output is
 * committed. Regenerate when the wording or the brand colours change.
 *
 *   node scripts/og-card.mjs
 *
 * Set CHROME_BIN if Chromium lives somewhere other than the paths tried below.
 */
import { spawn } from 'node:child_process';
import { access, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;
const OUT = path.resolve('public/og-card.png');

const CHROME_CANDIDATES = [
  process.env.CHROME_BIN,
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const findChrome = async () => {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* try the next one */
    }
  }
  throw new Error(
    `og-card: no Chromium found. Tried:\n  ${CHROME_CANDIDATES.join('\n  ')}\nSet CHROME_BIN to override.`,
  );
};

/**
 * Google Fonts serves different formats by User-Agent; this one gets woff2.
 * The files are inlined as data URIs so the render never races the network.
 */
const CHROME_UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FONT_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&family=Instrument+Serif:ital@1&display=swap';

const embedFonts = async () => {
  const css = await fetch(FONT_CSS_URL, { headers: { 'User-Agent': CHROME_UA } }).then((r) => {
    if (!r.ok) throw new Error(`og-card: font CSS request failed (${r.status})`);
    return r.text();
  });

  const urls = [...new Set([...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map((m) => m[1]))];
  const inlined = new Map();

  await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`og-card: font file failed (${res.status}) ${url}`);
      const b64 = Buffer.from(await res.arrayBuffer()).toString('base64');
      inlined.set(url, `data:font/woff2;base64,${b64}`);
    }),
  );

  return css.replace(/https:\/\/[^)]+\.woff2/g, (url) => inlined.get(url) ?? url);
};

/** The brand mark from components/Logo.tsx, as standalone SVG. */
const LOGO = `
<svg width="64" height="64" viewBox="0 0 40 40" aria-hidden="true">
  <circle cx="20" cy="20" r="18" fill="#6DC64F" />
  <circle cx="22.5" cy="20" r="13.4" fill="#0A0C0A" />
  <circle cx="7.6" cy="20" r="4.1" fill="#FFFFFF" />
</svg>`;

const page = (fontCss) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
${fontCss}
* { box-sizing: border-box; margin: 0; }
body {
  width: ${WIDTH}px; height: ${HEIGHT}px;
  background: #0a0c0a; color: #f3f4ef;
  font: 400 16px/1.62 'Archivo', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 68px 76px;
  /* Hairline accent, echoing the rules used across the site. */
  border-top: 6px solid #6dc64f;
}
.top { display: flex; align-items: center; gap: 20px; }
.wordmark { font-weight: 600; font-size: 34px; letter-spacing: 0.22em; }
.eyebrow {
  font: 500 19px/1 'Archivo', sans-serif;
  letter-spacing: 0.16em; text-transform: uppercase; color: #8bd86b;
  margin-bottom: 30px;
}
h1 { font: 600 76px/1.08 'Archivo', sans-serif; letter-spacing: -0.02em; }
h1 em { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; }
.foot {
  display: flex; justify-content: space-between; align-items: flex-end;
  border-top: 1px solid rgba(109, 198, 79, 0.2); padding-top: 26px;
  font-size: 21px; color: #a6ada2;
}
.foot strong { color: #f3f4ef; font-weight: 500; }
</style></head>
<body>
  <div class="top">${LOGO}<span class="wordmark">ORBIS</span></div>
  <div>
    <p class="eyebrow">Bookkeeping for BC small business</p>
    <h1>Clean books,<br><em>filed on time.</em></h1>
  </div>
  <div class="foot">
    <span>GST and PST both filed · <strong>West Vancouver, BC</strong></span>
    <span>orbisaccounting.ca</span>
  </div>
</body></html>`;

/**
 * Chrome's `--screenshot` flag captures a region the size of the *window*,
 * while the viewport it lays the page out in is shorter by however much room
 * headless reserves for browser chrome. That mismatch crops the bottom of a
 * full-bleed card, and no combination of `--window-size` gives an exact
 * 1200x630 of both. Driving DevTools directly sets the viewport explicitly,
 * so the capture is exactly the size asked for.
 */
const capture = async (chrome, fileUrl) => {
  const child = spawn(
    chrome,
    [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--remote-debugging-port=0',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );

  // The chosen port is only announced on stderr, since we asked for port 0.
  const port = await new Promise((resolve, reject) => {
    let buffered = '';
    const timer = setTimeout(() => reject(new Error('og-card: DevTools did not start')), 30_000);

    child.stderr.on('data', (chunk) => {
      buffered += chunk;
      const found = buffered.match(/ws:\/\/127\.0\.0\.1:(\d+)\//);
      if (found) {
        clearTimeout(timer);
        resolve(found[1]);
      }
    });
    child.on('exit', (code) => reject(new Error(`og-card: Chromium exited early (${code})`)));
  });

  /**
   * The endpoint on stderr is the browser target, which only speaks Browser.*
   * and Target.*. Page.* lives on the tab's own endpoint, listed here.
   */
  const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
  const endpoint = targets.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  if (!endpoint) {
    throw new Error('og-card: Chromium exposed no page target to drive');
  }

  const socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = () => reject(new Error('og-card: could not connect to DevTools'));
  });

  let nextId = 0;
  const pending = new Map();
  const events = new Map();

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.method) {
      events.get(message.method)?.forEach((resolve) => resolve(message.params));
      events.delete(message.method);
      return;
    }

    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(`og-card: ${message.error.message}`));
    else waiter.resolve(message.result);
  };

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  const once = (method) =>
    new Promise((resolve) => {
      events.set(method, [...(events.get(method) ?? []), resolve]);
    });

  try {
    await send('Page.enable');

    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url: fileUrl });
    await loaded;

    // Applied after load so layout is recomputed against the final viewport.
    await send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // The fonts are inlined as data URIs, so this settles without the network.
    await send('Runtime.evaluate', {
      expression: 'document.fonts.ready.then(() => true)',
      awaitPromise: true,
    });

    // An explicit clip pins the output size; without it the compositor can hand
    // back a surface that does not match the overridden viewport.
    const { data } = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
    });
    return Buffer.from(data, 'base64');
  } finally {
    socket.close();
    child.kill();
  }
};

const chrome = await findChrome();
const work = await mkdtemp(path.join(tmpdir(), 'orbis-og-'));
const html = path.join(work, 'card.html');

await writeFile(html, page(await embedFonts()));

const png = await capture(chrome, pathToFileURL(html).href);

const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== WIDTH || height !== HEIGHT) {
  throw new Error(`og-card: expected ${WIDTH}x${HEIGHT}, got ${width}x${height}`);
}

await writeFile(OUT, png);
console.log(
  `og-card: wrote ${path.relative(process.cwd(), OUT)} — ${width}x${height}, ${Math.round(png.length / 1024)} kB`,
);
