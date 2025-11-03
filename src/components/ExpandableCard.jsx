import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/cn";

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(false);
    };
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />
        )}
      </AnimatePresence>

      {/* Expanded modal */}
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 grid place-items-center z-[100] sm:mt-16 before:pointer-events-none"
            )}
          >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-[850px] h-full flex flex-col overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] sm:rounded-t-3xl bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-950 relative",
                classNameExpanded
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`}>
                <div className="relative overflow-hidden rounded-t-3xl aspect-[16/9]">
                  <img
                    src={src}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {/* soft gradient fade at bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
                </div>
              </motion.div>

              <div className="relative h-full">
                <div className="flex justify-between items-start p-6 sm:p-8">
                  <div>
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-gray-400 text-base sm:text-lg"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-semibold text-white text-3xl sm:text-4xl mt-1"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    onClick={() => setActive(false)}
                    className="h-10 w-10 grid place-items-center rounded-full bg-black/60 text-white/80 border border-gray-800 hover:bg-black/80 hover:text-white transition"
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>

                <div className="px-6 sm:px-8 pb-10">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-300 text-base flex flex-col gap-4"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card (collapsed) */}
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => setActive(true)}
        onKeyDown={(e) => (e.key === "Enter" ? setActive(true) : null)}
        layoutId={`card-${title}-${id}`}
        className={cn(
          "p-3 flex flex-col gap-4 bg-[#0a0a0a] rounded-2xl cursor-pointer",
          "border border-gray-800 hover:border-cyan-500/60 transition",
          className
        )}
        aria-expanded={active}
        aria-labelledby={`card-title-${id}`}
      >
        <motion.div
          layoutId={`image-${title}-${id}`}
          className="relative w-full overflow-hidden rounded-xl aspect-[16/10] bg-black/30"
        >
          <img
            src={src}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <motion.p
              layoutId={`description-${description}-${id}`}
              className="text-gray-400 text-sm font-medium"
            >
              {description}
            </motion.p>
            <motion.h3
              id={`card-title-${id}`}
              layoutId={`title-${title}-${id}`}
              className="text-white font-semibold"
            >
              {title}
            </motion.h3>
          </div>

          <motion.button
            aria-label="Open card"
            layoutId={`button-${title}-${id}`}
            className="h-8 w-8 grid place-items-center rounded-full bg-black/60 text-white/80 border border-gray-800 hover:bg-black/80 hover:text-white transition"
          >
            <motion.div
              animate={{ rotate: active ? 45 : 0 }}
              transition={{ duration: 0.35 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
