// Locks the home page to one full-screen "slide" (hero, each project, the
// footer) at a time — a wheel tick, swipe, or arrow key advances exactly
// one slide, with the next input ignored until the transition finishes.
// Degrades to a normal tall scrolling page without JS, and is skipped
// entirely for prefers-reduced-motion.
const TRANSITION_MS = 850;
const SWIPE_THRESHOLD = 40;

let activeCleanup: (() => void) | null = null;

export function setupScrollStage() {
  activeCleanup?.();
  activeCleanup = null;
  document.documentElement.classList.remove("scroll-stage");

  const stage = document.querySelector<HTMLElement>("#stage");
  const track = document.querySelector<HTMLElement>("#stage-track");
  if (!stage || !track) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const slides = Array.from(track.querySelectorAll<HTMLElement>(":scope > .slide"));
  if (slides.length < 2) return;

  let index = 0;
  let locked = false;
  let unlockTimer: number | undefined;

  const measureNav = () => {
    const nav = document.querySelector<HTMLElement>(".nav");
    document.documentElement.style.setProperty("--nav-h", `${nav?.offsetHeight ?? 0}px`);
  };

  const goTo = (next: number) => {
    next = Math.max(0, Math.min(slides.length - 1, next));
    if (next === index) return;
    const previousIndex = index;
    index = next;
    track.style.transform = `translateY(-${index * 100}%)`;
    locked = true;
    window.clearTimeout(unlockTimer);
    unlockTimer = window.setTimeout(() => {
      locked = false;
    }, TRANSITION_MS);
    stage.dispatchEvent(new CustomEvent("slidechange", { detail: { index, previousIndex } }));
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (locked) return;
    if (e.deltaY > 0) goTo(index + 1);
    else if (e.deltaY < 0) goTo(index - 1);
  };

  let touchStartY = 0;
  const onTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (locked) return;
    const delta = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta > 0 ? index + 1 : index - 1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (locked) return;
    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  // Tab-focusing a link inside a later slide (keyboard navigation, or a
  // screen reader's virtual cursor) brings that slide into view instead of
  // leaving it hidden off-screen behind the locked stage.
  const onFocusIn = (e: FocusEvent) => {
    const slideIndex = slides.findIndex((slide) => slide.contains(e.target as Node));
    if (slideIndex !== -1) goTo(slideIndex);
  };

  measureNav();
  window.addEventListener("resize", measureNav);
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("touchstart", onTouchStart, { passive: true });
  stage.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  stage.addEventListener("focusin", onFocusIn);

  document.documentElement.classList.add("scroll-stage");

  activeCleanup = () => {
    window.clearTimeout(unlockTimer);
    window.removeEventListener("resize", measureNav);
    window.removeEventListener("keydown", onKeyDown);
    document.documentElement.classList.remove("scroll-stage");
  };
}

export function teardownScrollStage() {
  activeCleanup?.();
  activeCleanup = null;
}
