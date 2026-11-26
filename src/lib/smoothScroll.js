// Smooth (inertia) scrolling with Lenis. Off for people who ask for reduced motion.
import { useEffect } from "react";
import Lenis from "lenis";

let lenis = null;

const NAV_CLEARANCE = 64; // sticky navbar height + a little air

/** The running Lenis instance, or null when smooth scrolling is off. */
export const getLenis = () => lenis;

/** Jump to the top without animating (used between page transitions). */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/** Pause / resume smooth scrolling, e.g. while a modal is open. */
export function setScrollLocked(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/**
 * Same-page "#id" links: glide there instead of the browser's instant jump, stop clear of the
 * navbar (or the target's own scroll-margin), update the URL hash, and move keyboard focus to
 * the target so links like "Skip to content" still work.
 */
function onAnchorClick(e) {
  if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest?.('a[href^="#"]');
  if (!a) return;
  const id = decodeURIComponent(a.getAttribute("href").slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  lenis.scrollTo(target, { offset: -Math.max(margin, NAV_CLEARANCE) });
  history.replaceState(history.state, "", `#${id}`);
  if (!target.hasAttribute("tabindex") && !target.matches("a, button, input, select, textarea")) {
    target.setAttribute("tabindex", "-1");
  }
  target.focus({ preventScroll: true });
}

export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const start = () => {
      if (lenis || reduce.matches) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
        smoothWheel: true,
      });
      const loop = (time) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };

    start();
    const onChange = () => (reduce.matches ? stop() : start());
    reduce.addEventListener("change", onChange);
    document.addEventListener("click", onAnchorClick);
    return () => {
      reduce.removeEventListener("change", onChange);
      document.removeEventListener("click", onAnchorClick);
      stop();
    };
  }, []);
}
