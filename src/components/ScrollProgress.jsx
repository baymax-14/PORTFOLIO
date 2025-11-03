import { motion, useScroll, useSpring } from "framer-motion";

const DEFAULT_SPRING = { stiffness: 200, damping: 50, restDelta: 0.001 };

export default function ScrollProgress({
  className = "",
  springOptions,
  containerRef,   // optional: pass a ref to a scrollable container; omit for window
}) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, { ...(springOptions || DEFAULT_SPRING) });

  return (
    <motion.div
      className={`inset-x-0 top-0 h-1 origin-left ${className}`}
      style={{ scaleX }}
    />
  );
}

