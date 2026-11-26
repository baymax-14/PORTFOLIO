import { m } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1];

/** Fades its content up into place the first time it scrolls into view. Renders as `as` (div by default),
 *  so it can replace an existing wrapper without changing the layout. Reduced motion: opacity only. */
export default function Reveal({ as = "div", delay = 0, y = 24, children, ...props }) {
  const M = m[as];
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </M>
  );
}
