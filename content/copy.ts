/**
 * Resolves the copy bundle for a locale.
 *
 * `ZH` is typed as `Widen<typeof EN>`, so this file is where a missing
 * translation module — or a module that forgot an export — fails the build.
 * Together with the per-module typing in content/zh/*.ts, that means the only
 * way to ship a half-translated page is to translate a string into itself.
 */
import type { Locale, Widen } from './i18n';

import * as enSite from './site';
import * as enPages from './pages';
import * as enLegal from './legal';
import { UI as enUI } from './ui';

import * as zhSite from './zh/site';
import * as zhPages from './zh/pages';
import * as zhLegal from './zh/legal';
import { UI as zhUI } from './zh/ui';

const EN = { site: enSite, pages: enPages, legal: enLegal, ui: enUI };

const ZH: Widen<typeof EN> = { site: zhSite, pages: zhPages, legal: zhLegal, ui: zhUI };

/** The shape every component reads. Values are widened, so `en` fits it too. */
export type Copy = Widen<typeof EN>;

const BUNDLES: Record<Locale, Copy> = { en: EN, zh: ZH };

export const copyFor = (locale: Locale): Copy => BUNDLES[locale];
