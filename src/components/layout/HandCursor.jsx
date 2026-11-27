import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

// things that get the "highlighter" treatment on hover
const TARGETS = 'a, button, [role="button"], summary, label, select, .cursor-target';
// text fields: get out of the way so the caret stays visible
const TEXT_FIELDS = 'input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

/**
 * A hand-drawn marker ring that trails the normal mouse pointer (which stays visible).
 * Desktop mice only; nothing on touch screens or with reduced motion.
 */
export default function HandCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("idle"); // idle | target | text
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // a little lag so it feels drawn along behind the pointer
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.6 });

  // only for a real mouse and when motion is welcome; follow setting changes live
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (el.closest(TEXT_FIELDS)) setMode("text");
      else if (el.closest(TARGETS)) setMode("target");
      else setMode("idle");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = (e) => {
      if (!e.relatedTarget) setVisible(false); // pointer left the window
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerout", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const scale = mode === "text" ? 0 : (mode === "target" ? 1.7 : 1) * (pressed ? 0.8 : 1);
  const shape = {
    animate: { scale, opacity: visible && mode !== "text" ? 1 : 0, rotate: mode === "target" ? -12 : 0 },
    transition: { type: "spring", stiffness: 420, damping: 26 },
  };

  // Two layers that move together. The wash blends straight into the page (mix-blend on the fixed
  // layer itself) so it tints like a real highlighter: paper turns yellow, white text on dark buttons
  // turns yellow, black stays black. The ring sits on top unblended so it stays visible everywhere.
  return (
    <>
      <m.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-multiply" style={{ x: sx, y: sy }}>
        <m.div className="-ml-[18px] -mt-[18px] size-9" {...shape}>
          <svg viewBox="0 0 40 40" className="size-full overflow-visible">
            <m.path
              d="M20 6 C29 5 35 12 34 21 C33 30 26 35 18 34 C10 33 5 27 6 18 C7 10 13 6 20 6 Z"
              fill="#F2C94C"
              animate={{ opacity: mode === "target" ? 0.85 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </svg>
        </m.div>
      </m.div>

      <m.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[71]" style={{ x: sx, y: sy }}>
        <m.div className="-ml-[18px] -mt-[18px] size-9" {...shape}>
          <svg viewBox="0 0 40 40" className="size-full overflow-visible">
            {/* marker ring: one wobbly loop that overshoots where it started, like a pen circle */}
            <path
              d="M21 3.5 C31 3 37.5 10.5 36.5 20.5 C35.5 31 27.5 37.5 18.5 36.5 C9 35.5 2.5 28 3.5 18.5 C4.5 9.5 11.5 3.5 23.5 4.8"
              fill="none"
              stroke="#E8553A"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </m.div>
      </m.div>
    </>
  );
}
