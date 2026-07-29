import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Content-Security-Policy for the built site.
 *
 * The site collects names, emails, phone numbers and free-text business detail
 * through the intake form. Without a policy, any script that ever runs in this
 * origin — a compromised third-party tag, a bad dependency — can read that form
 * and post it anywhere. This is the control that bounds the damage.
 *
 * Three limits are inherent to how it has to be delivered, and are not
 * oversights:
 *
 *   - GitHub Pages serves static files and cannot set response headers, so the
 *     policy rides in a meta tag.
 *   - `frame-ancestors` is ignored in a meta tag. The site can still be framed,
 *     and nothing in this repo can change that; it needs a real header, which
 *     means putting a proxy in front of Pages.
 *   - `'unsafe-inline'` on style-src is unavoidable while the section
 *     components set `style` attributes (the reveal delays in
 *     useScrollReveal.ts, a few max-widths). CSP counts those as inline styles.
 *
 * JSON-LD is unaffected: `<script type="application/ld+json">` is a data block
 * rather than executable script, so script-src does not apply to it.
 *
 * The third-party origins are Google's own documented GA4 allowlist plus the
 * Web3Forms endpoint the intake form posts to. Adding any new service means
 * adding its origin here as well, or the browser drops the request with only a
 * console error to show for it.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://*.googletagmanager.com",
  "connect-src 'self' https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  // The intake form submits with fetch and calls preventDefault, so no native
  // form post is ever intended. 'none' means a hijacked <form> cannot post the
  // visitor's details to another host.
  "form-action 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-src 'none'",
].join('; ');

/**
 * Injects the policy above into dist/index.html, which scripts/prerender.mjs
 * then copies into every prerendered route.
 *
 * Build only. `vite dev` serves inline scripts of its own — the React Refresh
 * preamble and the HMR client — and a policy this strict blocks them, so
 * writing the tag into index.html directly would break every dev start.
 *
 * Placed immediately after `<meta charset>` rather than at the top of <head>,
 * which matters for a reason that is easy to miss: the charset declaration is
 * only honoured if it falls within the first 1024 bytes of the document. This
 * policy is ~600 bytes on its own, so prepending it would spend most of that
 * budget, and adding a couple more origins later would push charset past the
 * limit — at which point the Chinese routes render as mojibake and nothing
 * points at this file as the cause. After the charset, the budget is untouched
 * and the policy still precedes every script, style and link in the document.
 */
const csp = (): Plugin => ({
  name: 'orbis-csp',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: (html) => {
      const charset = /<meta\s+charset=["']?[\w-]+["']?\s*\/?>/i;
      if (!charset.test(html)) {
        throw new Error('csp: no <meta charset> in index.html to anchor the policy to');
      }
      // Replacer function, not a string: `$&` and friends are special in a
      // replacement string, and a policy is not worth losing to that.
      return html.replace(
        charset,
        (tag) => `${tag}\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
      );
    },
  },
});

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), csp()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
