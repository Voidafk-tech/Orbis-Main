/**
 * Google Analytics 4, wired to the handful of actions that actually indicate a
 * lead: the intake form succeeding, and taps on the phone and email links.
 *
 * Everything here is inert until MEASUREMENT_ID is filled in. That is
 * deliberate — a half-configured analytics tag is worse than none, because it
 * looks like it is recording when it is not.
 *
 * To switch it on, put the property's GA4 measurement ID below. It looks like
 * `G-XXXXXXXXXX` and is not a secret: it ships in the page either way.
 */
const MEASUREMENT_ID: string = 'G-NWSJH604L3';

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const enabled = () => MEASUREMENT_ID !== '' && typeof window !== 'undefined';

/**
 * Named for GA4's own conventions where one exists, because the built-in
 * reports key off those names. `generate_lead` is a recommended event and
 * shows up in the conversion reports without extra configuration.
 */
export const EVENTS = {
  lead: 'generate_lead',
  formError: 'form_error',
  phone: 'click_phone',
  email: 'click_email',
} as const;

export function trackEvent(name: string, params: Params = {}): void {
  if (!enabled()) return;
  window.gtag?.('event', name, params);
}

/** SPA route changes do not fire GA4's automatic page_view, so send one. */
export function trackPageView(path: string, title: string): void {
  if (!enabled()) return;
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  });
}

/**
 * Phone and email links live in the header, the footer and the intake section,
 * and more will be added. One delegated listener catches them all rather than
 * every component having to remember to report itself.
 *
 * Uses the capture phase so it still runs if something calls stopPropagation,
 * and never blocks or delays the navigation.
 */
const trackContactLinks = (event: MouseEvent) => {
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!link) return;

  const href = link.getAttribute('href') ?? '';
  if (href.startsWith('tel:')) trackEvent(EVENTS.phone, { link_location: linkArea(link) });
  else if (href.startsWith('mailto:')) trackEvent(EVENTS.email, { link_location: linkArea(link) });
};

/** Which part of the page the tap came from, so header vs footer is separable. */
const linkArea = (link: Element): string => {
  if (link.closest('.header')) return 'header';
  if (link.closest('.footer')) return 'footer';
  if (link.closest('.intake')) return 'intake';
  return 'body';
};

export function initAnalytics(): void {
  if (!enabled()) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads `arguments` off the queue, so this cannot be a rest param.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  // App sends its own page_view on every route change, including the first.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  document.addEventListener('click', trackContactLinks, { capture: true });
}
