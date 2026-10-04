// Turns a plain YouTube/Vimeo URL (the kind you'd copy from the address bar)
// into the URL needed for an embedded, autoplay-safe iframe player.
export function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
      // Already-embedded or /shorts/ style links
      const match = u.pathname.match(/\/(embed|shorts)\/([^/]+)/);
      if (match) return `https://www.youtube-nocookie.com/embed/${match[2]}`;
      return null;
    }

    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}
