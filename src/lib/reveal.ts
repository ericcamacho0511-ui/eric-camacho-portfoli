// Fades/slides in any [data-reveal] element already in the viewport, then
// watches the rest and reveals each one the moment it scrolls into view.
// Skipped entirely for prefers-reduced-motion — global.css also keeps
// [data-reveal] elements fully visible in that case, so nothing ever
// depends on this script running to be seen.
export function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-bound])");
  if (els.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
  );

  els.forEach((el, i) => {
    el.dataset.revealBound = "true";
    // A slight stagger across elements that enter together (e.g. a grid
    // row) reads as intentional rather than everything popping at once.
    el.style.transitionDelay = `${Math.min(i % 6, 6) * 60}ms`;
    observer.observe(el);
  });
}
