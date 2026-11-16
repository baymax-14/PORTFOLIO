import { useEffect, useRef } from "react";

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
  const activeTimers = useRef(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;

    const p = rootRef.current.querySelector("p");
    if (!p) return;

    const originalText = p.textContent || "";
    // Wrap words and characters
    const words = originalText.split(/(\s+)/);
    p.innerHTML = "";

    words.forEach((part) => {
      if (/^\s+$/.test(part)) {
        p.appendChild(document.createTextNode(part));
      } else {
        const wordSpan = document.createElement("span");
        wordSpan.className = "st-word inline-block whitespace-nowrap";
        for (const char of part) {
          const charSpan = document.createElement("span");
          charSpan.className = "st-char inline-block";
          charSpan.textContent = char;
          charSpan.setAttribute("data-content", char);
          wordSpan.appendChild(charSpan);
        }
        p.appendChild(wordSpan);
      }
    });

    const chars = Array.from(p.querySelectorAll(".st-char"));
    const timers = activeTimers.current;

    const handleMove = (e) => {
      chars.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const target = c.getAttribute("data-content") || "";
          if (timers.has(c)) {
            clearInterval(timers.get(c));
            timers.delete(c);
          }

          const animDuration = Math.max(150, duration * 1000 * (1 - dist / radius));
          const intervalTime = Math.max(25, 60 / speed);
          const startTime = Date.now();

          const intervalId = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= animDuration) {
              c.textContent = target;
              clearInterval(intervalId);
              timers.delete(c);
            } else {
              const randChar =
                scrambleChars[Math.floor(Math.random() * scrambleChars.length)] || ".";
              c.textContent = randChar;
            }
          }, intervalTime);

          timers.set(c, intervalId);
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      timers.forEach((id) => clearInterval(id));
      timers.clear();
      p.textContent = originalText;
    };
  }, [radius, duration, speed, scrambleChars, children]);

  return (
    <div
      ref={rootRef}
      className={[
        "font-mono text-gray-300 leading-relaxed text-base md:text-lg",
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
