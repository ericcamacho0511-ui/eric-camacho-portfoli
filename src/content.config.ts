import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// A piece of prose that needs its own wording per language (not just a
// lookup like "type"/"role") — project notes, synopses. ca/es/en all
// required so a project can't go live missing a translation.
const localizedString = z.object({ ca: z.string(), es: z.string(), en: z.string() });

// Finished projects — each one gets its own page at /[locale]/work/[slug]
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(), // proper noun — same across locales, not translated
    type: z.string(), // e.g. "Music video", "Short film", "Photobook" — looked up in src/i18n/ui.ts, not translated per project
    role: z.string(), // e.g. "Producer", "Production manager" — same lookup
    director: z.string().optional(), // not every project has one (e.g. a photobook)
    artist: z.string().optional(), // for music videos: who it was made for — shown in the browser tab title
    year: z.number(),
    video: z.string().optional(), // YouTube/Vimeo URL — omit if none yet
    // Only set these if the video is NOT standard landscape (e.g. a vertical
    // edit) — omit for a normal upload, it defaults to 16:9.
    videoAspectW: z.number().optional(),
    videoAspectH: z.number().optional(),
    cover: z.string(), // static poster/thumbnail image, e.g. "/images/gasolina/cover.jpg"
    bgVideo: z.string().optional(), // short muted loop for the homepage reel background + detail-page hero fallback
    // The cover loop's real dimensions, so its box on the project page can
    // match its native aspect ratio instead of being cropped to fill 16:9.
    bgVideoAspectW: z.number().optional(),
    bgVideoAspectH: z.number().optional(),
    // A local video WITH sound for the project page's own hero — distinct
    // from bgVideo (always muted, used for the homepage loop). Shown with
    // native controls, no autoplay/loop, since it's meant to be watched.
    heroVideo: z.string().optional(),
    heroVideoAspectW: z.number().optional(),
    heroVideoAspectH: z.number().optional(),
    poster: z.string().optional(), // official key art/poster — shown beside the production note, kept separate from "stills"
    credits: z.string().optional(), // an end-credits still or clip (.mp4) — shown beside the production note, same slot as "poster"
    // Max width (px) for that poster/credits slot. Default (440) suits a
    // portrait poster; a landscape credits still/clip needs more width to
    // reach full column height without being capped small.
    asideWidth: z.number().optional(),
    synopsis: localizedString.optional(), // short, spoiler-light premise — shown above the production note
    note: localizedString, // the production note — replaces the markdown body so it can be translated per locale
    stills: z.array(z.string()).default([]), // gallery images — also used as the homepage slider for photo-only projects
    featured: z.boolean().default(false), // show on the homepage hero
    order: z.number().default(0), // controls display order (lower = earlier)
  }),
});

// Work-in-progress projects — shown as teaser cards, no detail page yet
const upcoming = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/upcoming" }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    role: z.string(),
    director: z.string().optional(),
    year: z.number(),
    order: z.number().default(0),
  }),
});

export const collections = { work, upcoming };
