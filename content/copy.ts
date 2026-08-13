/**
 * Resolves the copy bundle for a locale.
 *
 * Each translation is typed as `Widen<typeof EN>`, so this file is where a
 * missing translation module — or a module that forgot an export — fails the
 * build. Together with the per-module typing in content/zh/*.ts, that means the
 * only way to ship a half-translated page is to translate a string into itself.
 *
 * `BUNDLES` is keyed on `BuiltLocale` rather than `Locale`, which is what makes
 * adding a language to `LOCALES` a compile error here until its copy exists.
 * That is the intended order: the tables in i18n.ts can be filled in early, but
 * a locale cannot reach the site without a bundle behind it.
 */
import type { BuiltLocale, Widen } from './i18n';

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

const BUNDLES: Record<BuiltLocale, Copy> = { en: EN, 'zh-hans': ZH };

export const copyFor = (locale: BuiltLocale): Copy => BUNDLES[locale];
