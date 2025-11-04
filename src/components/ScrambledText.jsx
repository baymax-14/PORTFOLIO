import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef(null);
  const pRef = useRef(null);

  useEffect(() => {
    // Guard for SSR
    if (typeof window === "undefined") return;
    if (!rootRef.current) return;

    // Target the paragraph only once
    const p = rootRef.current.querySelector("p");
    if (!p) return;
    pRef.current = p;

    const split = SplitText.create(p, {
      type: "chars",
      charsClass: "inline-block will-change-transform",
    });

    split.chars.forEach((el) => {
      gsap.set(el, { attr: { "data-content": el.innerHTML } });
    });

    const handleMove = (e) => {
      split.chars.forEach((c) => {
        const { left, width, top, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={[
        // Keep your sizing & color
        "font-mono text-gray-300 leading-relaxed text-base md:text-lg",
        // Fix word breaking issues
        "break-words whitespace-normal",
        "[word-break:normal] hyphens-auto",
        // Optional: remove mono if you don't want the typewriter feel
        // "font-mono",
        className,
      ].join(" ")}
      style={{
        // CSS fallbacks for non-Tailwind contexts
        wordBreak: "normal",
        overflowWrap: "break-word",
        hyphens: "auto",
        ...style,
      }}
    >
      <p className="m-0">{children}</p>
    </div>
  );
};

export default ScrambledText;
