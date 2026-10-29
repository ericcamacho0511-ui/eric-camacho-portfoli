import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { locales } from "../i18n/ui";

// Every page in every language, each one pointing at its translations — the
// file Search Console reads to find the whole site. Built from the same
// content collection as the pages, so a new project shows up on its own.
export const GET: APIRoute = async ({ site }) => {
  const work = await getCollection("work");
  const pages = ["", "work/", "about/", "contact/", ...work.map((project) => `work/${project.id}/`)];

  const url = (locale: string, page: string) => new URL(`/${locale}/${page}`, site).href;

  const entries = pages.flatMap((page) =>
    locales.map((locale) => {
      const alternates = [
        ...locales.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${url(l, page)}"/>`),
        `<xhtml:link rel="alternate" hreflang="x-default" href="${url("ca", page)}"/>`,
      ].join("");
      return `<url><loc>${url(locale, page)}</loc>${alternates}</url>`;
    }),
  );

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
