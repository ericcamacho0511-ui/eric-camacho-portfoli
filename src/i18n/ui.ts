export const locales = ["ca", "es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ca";

export const localeNames: Record<Locale, string> = {
  ca: "CA",
  es: "ES",
  en: "EN",
};

type Dict = Record<Locale, string>;

// All static interface text — nav, headings, labels, footer. Project
// content (titles, notes, synopses) lives in the content collections
// instead, since that’s project-specific, not interface chrome.
export const ui = {
  nav: {
    work: { ca: "Treballs", es: "Trabajos", en: "Work" },
    about: { ca: "Sobre mi", es: "Sobre mí", en: "About" },
    contact: { ca: "Contacte", es: "Contacto", en: "Contact" },
  },
  home: {
    heroTitle: {
      ca: "Productor audiovisual, Barcelona.",
      es: "Productor audiovisual, Barcelona.",
      en: "Audiovisual producer, Barcelona.",
    },
  },
  work: {
    eyebrow: { ca: "Treballs", es: "Trabajos", en: "Work" },
    heading: {
      ca: "Tot, en un sol lloc.",
      es: "Todo, en un solo lugar.",
      en: "Everything, in one place.",
    },
    upcoming: { ca: "Properament", es: "Próximamente", en: "Upcoming" },
    otherExperience: { ca: "Altres experiències", es: "Otras experiencias", en: "Other experience" },
  },
  project: {
    synopsis: { ca: "Sinopsi", es: "Sinopsis", en: "Synopsis" },
    stills: { ca: "Fotogrames", es: "Fotogramas", en: "Stills" },
    for: { ca: "Per a", es: "Para", en: "For" },
    directedBy: { ca: "Dirigit per", es: "Dirigido por", en: "Directed by" },
    dir: { ca: "Dir.", es: "Dir.", en: "Dir." },
    backToWork: { ca: "← Tornar a treballs", es: "← Volver a trabajos", en: "← Back to work" },
  },
  about: {
    eyebrow: { ca: "Sobre mi", es: "Sobre mí", en: "About" },
    bio: [
      {
        ca: "Sóc productor i estudiant de producció a l’ESCAC, a Barcelona. La major part de la meva trajectòria és en curtmetratges estudiantils, treballant a una escala prou petita perquè produir volgués dir tocar gairebé tots els departaments pel camí, no gestionar-los des de la distància. Últimament també m’he anat endinsant en els videoclips, un ritme diferent, però el mateix instint de fons.",
        es: "Soy productor y estudiante de producción en ESCAC, en Barcelona. La mayor parte de mi trayectoria está en cortometrajes estudiantiles, trabajando a una escala lo bastante pequeña como para que producir significara tocar casi todos los departamentos por el camino, no gestionar desde la distancia. Últimamente también me he ido adentrando en los videoclips, un ritmo distinto, pero el mismo instinto de fondo.",
        en: "I’m a producer and production student at ESCAC, in Barcelona, specializing in production. Most of my track record is in student short films, working at a scale small enough that producing meant touching nearly every department along the way, not managing from a distance. Lately I’ve also been moving into music videos, a different rhythm, but the same instinct underneath.",
      },
      {
        ca: "Em considero un productor a qui li agrada submergir-se en el procés creatiu i impulsar la visió de l’equip artístic, no només mantenir les coses dins del calendari. Això ve dels càrrecs pels quals he passat abans de produir, 1r ajudant de direcció, cap de producció, on vaig aprendre que un rodatge només surt bé si les persones que el fan no han de pensar en res més que l’escena que tenen davant. Aquesta continua sent la feina, tal com ho veig: obrir camí perquè la visió realment es faci realitat.",
        es: "Me considero un productor al que le gusta sumergirse en el proceso creativo e impulsar la visión del equipo artístico, no solo mantener las cosas dentro del calendario. Eso viene de los puestos por los que pasé antes de producir, primer ayudante de dirección, jefe de producción, donde aprendí que un rodaje solo sale bien si las personas que lo hacen no tienen que pensar en nada más que en la escena que tienen delante. Ese sigue siendo el trabajo, tal como yo lo veo: abrir camino para que la visión realmente se haga realidad.",
        en: "I think of myself as a producer who likes to get immersed in the creative process and push the artistic team’s vision forward, not just keep things running on schedule. That comes from the roles I passed through before producing, 1st AD, head of production, where I learned that a shoot only goes well if the people making it don’t have to think about anything except the scene in front of them. That’s still the job, as I see it: clear the way so the vision actually gets made.",
      },
    ] as Dict[],
  },
  contact: {
    eyebrow: { ca: "Contacte", es: "Contacto", en: "Contact" },
    heading: { ca: "Parlem.", es: "Hablemos.", en: "Let’s talk." },
  },
  footer: {
    getInTouch: { ca: "Contacta’m", es: "Contáctame", en: "Get in touch" },
  },
  meta: {
    description: {
      ca: "Èric Camacho, productor audiovisual. Curtmetratges i videoclips, produïts des de zero.",
      es: "Èric Camacho, productor audiovisual. Cortometrajes y videoclips, producidos desde cero.",
      en: "Èric Camacho, audiovisual producer. Short films and music videos, produced from the ground up.",
    },
  },
  notFound: {
    eyebrow: { ca: "Error 404", es: "Error 404", en: "Error 404" },
    heading: { ca: "Pàgina no trobada.", es: "Página no encontrada.", en: "Page not found." },
    body: {
      ca: "Aquesta pàgina no existeix o s’ha mogut d’adreça.",
      es: "Esta página no existe o se ha movido de dirección.",
      en: "This page doesn’t exist, or it moved somewhere else.",
    },
    cta: { ca: "Torna a l’inici", es: "Volver al inicio", en: "Back to home" },
  },
} as const;

// Small closed vocabularies reused across many projects — translated once
// here instead of per project. Keyed by the English value stored in each
// content file’s frontmatter (that value also IS the English display text).
export const typeLabels: Record<string, Dict> = {
  "Short film": { ca: "Curtmetratge", es: "Cortometraje", en: "Short film" },
  "Music video": { ca: "Videoclip", es: "Videoclip", en: "Music video" },
  Photobook: { ca: "Fotollibre", es: "Fotolibro", en: "Photobook" },
  Spot: { ca: "Espot", es: "Spot", en: "Spot" },
};

export const roleLabels: Record<string, Dict> = {
  Producer: { ca: "Productor", es: "Productor", en: "Producer" },
  "Production manager": { ca: "Director de producció", es: "Director de producción", en: "Production manager" },
  "Production assistant": { ca: "Auxiliar de producció", es: "Auxiliar de producción", en: "Production assistant" },
  "1st AD": { ca: "1r ajudant de direcció", es: "1er ayudante de dirección", en: "1st AD" },
  "Head of production": { ca: "Cap de producció", es: "Jefe de producción", en: "Head of production" },
};

export function t(dict: Dict, locale: Locale): string {
  return dict[locale];
}

export function typeLabel(value: string, locale: Locale): string {
  return typeLabels[value]?.[locale] ?? value;
}

export function roleLabel(value: string, locale: Locale): string {
  return roleLabels[value]?.[locale] ?? value;
}

// Swaps the locale segment of a pathname — used by the language switcher to
// link to the equivalent page in another language (slugs are the same
// across locales, only the first path segment changes).
export function switchLocalePath(pathname: string, newLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (locales.includes(segments[0] as Locale)) {
    segments[0] = newLocale;
  } else {
    segments.unshift(newLocale);
  }
  return "/" + segments.join("/") + "/";
}
