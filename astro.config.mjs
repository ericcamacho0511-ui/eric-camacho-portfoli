// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ericcamacho.com',
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  // Fallback for local dev and hosts without server redirects. On Vercel the
  // real redirect for "/" lives in vercel.json (a proper 308/307 by browser
  // language), which runs before this page is ever served.
  redirects: {
    '/': '/ca/',
  },
});
