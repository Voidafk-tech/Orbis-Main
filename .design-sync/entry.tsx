/* design-sync barrel entry.
 *
 * This repo is an application, not a published component package: there is no
 * library `dist/` and every component is a default export, which `export *`
 * cannot re-export. So the converter is pointed here instead — a barrel that
 * names each real component as a named export and pulls in the design system's
 * stylesheet so esbuild emits it as _ds_bundle.css.
 *
 * Nothing is reimplemented here. Every line is a re-export of the component the
 * site itself renders.
 */

// The whole design system: tokens, component styles, and (via its own @import
// of fonts.css) the four self-hosted brand faces, which esbuild inlines as
// data URIs — see .design-sync/tsconfig.json for how the /fonts/* URLs resolve.
import '../index.css';

// Context the components read from. LocaleProvider supplies copy and locale
// paths; MemoryRouter satisfies the useLocation() both it and Anchor call.
// Both are wired as the preview provider chain in .design-sync/config.json.
export { LocaleProvider, useLocale, useCopy } from '../components/LocaleContext';
export { MemoryRouter } from 'react-router';

// Page chrome and building blocks.
export { default as Anchor } from '../components/Anchor';
export { default as IntakeForm } from '../components/IntakeForm';
export { LogoMark, SatelliteBullet } from '../components/Logo';
export { default as ScrollCue } from '../components/ScrollCue';
export { default as SiteFooter } from '../components/SiteFooter';
export { default as SiteHeader } from '../components/SiteHeader';
export { default as WeChatContact, WeChatId } from '../components/WeChatContact';

// Page sections.
export { default as Faq } from '../components/sections/Faq';
export { default as Hero } from '../components/sections/Hero';
export { default as HeroSequence } from '../components/sections/HeroSequence';
export { default as Intake } from '../components/sections/Intake';
export { default as Pains } from '../components/sections/Pains';
export { default as Pricing } from '../components/sections/Pricing';
export { default as Services } from '../components/sections/Services';
export { default as Steps } from '../components/sections/Steps';
export { default as TaxExplainer } from '../components/sections/TaxExplainer';
export { default as Trust } from '../components/sections/Trust';
export { default as TrustStrip } from '../components/sections/TrustStrip';
export { default as WhyOrbis } from '../components/sections/WhyOrbis';
