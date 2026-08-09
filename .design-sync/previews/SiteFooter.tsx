import React from 'react';
import { SiteFooter } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The footer as App.tsx mounts it — the lockup, the tagline, the full route
 * list and the practice's contact line. (App puts it last in a `.page` flex
 * column, which is only what pins it to the bottom of a full page.)
 */
export const Default = () => <SiteFooter />;
