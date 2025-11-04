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
  const splitRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!rootRef.current) return;

    const p = rootRef.current.querySelector("p");
    if (!p) return;

    // IMPORTANT: split into words AND chars
    const split = SplitText.create(p, {
      type: "words,chars",
      // GSAP will add classes: .word and .char automatically
      wordsClass: "st-word",
      charsClass: "st-char",
    });
    splitRef.current = split;

    // Make each word non-breaking unit (prevents mid-word wrap)
    gsap.set(split.words, {
      display: "inline-block",
      whiteSpace: "nowrap",
    });

    // Characters remain inline-block so the scramble animates nicely
    gsap.set(split.chars, {
      display: "inline-block",
      willChange: "transform",
    });

    // Cache original character content for scrambleText
    split.chars.forEach((el) => {
      gsap.set(el, { attr: { "data-content": el.textContent || "" } });
    });

    const handleMove = (e) => {
      split.chars.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.getAttribute("data-content") || "",
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
      // Revert DOM back to the original paragraph
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={[
        "font-mono text-gray-300 leading-relaxed text-base md:text-lg",
        // allow normal wrapping between words only (not inside words)
        "whitespace-normal break-words [word-break:normal] hyphens-none",
        className,
      ].join(" ")}
      style={{
        wordBreak: "normal",
        overflowWrap: "break-word",
        hyphens: "none",
        ...style,
      }}
    >
      <p className="m-0">{children}</p>
    </div>
  );
};

export default ScrambledText;
